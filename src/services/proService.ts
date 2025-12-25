import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import Purchases, { LOG_LEVEL, type CustomerInfo, type PurchasesPackage, type PurchasesOffering } from 'react-native-purchases';

import type { ProState } from '@/src/types/models';

export type PlanType = 'monthly' | 'yearly';

const PRO_STATE_KEY = 'dotchain_pro_state_v1';
const ENTITLEMENT_ID = 'Pro_Plan';
const PACKAGE_MONTHLY_ID = 'dotchain_pro_monthly';
const PACKAGE_YEARLY_ID = 'dotchain_pro_yearly';

let configured = false;

const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

function getExtraValue(key: string) {
  const expoConfig = Constants.expoConfig ?? Constants.manifest;
  const extra = (expoConfig as any)?.extra ?? {};
  return extra?.[key];
}

function getApiKey(): string | null {
  if (Platform.OS === 'ios') {
    return getExtraValue('REVENUECAT_IOS_API_KEY') ?? null;
  }
  if (Platform.OS === 'android') {
    return getExtraValue('REVENUECAT_ANDROID_API_KEY') ?? null;
  }
  return null;
}

async function saveState(state: ProState) {
  await SecureStore.setItemAsync(PRO_STATE_KEY, JSON.stringify(state));
}

function toProState(info: CustomerInfo): ProState {
  const isPro = Boolean(info.entitlements.active[ENTITLEMENT_ID]);
  return {
    isPro,
    anonUserId: info.originalAppUserId ?? null,
    lastCheckAt: new Date().toISOString(),
  };
}

async function ensureConfigured() {
  if (!isNative) return;
  if (configured) return;

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('RevenueCat API key is missing.');
  }

  Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  await Purchases.configure({ apiKey });
  configured = true;
}

async function getCurrentOffering(): Promise<PurchasesOffering | null> {
  await ensureConfigured();
  if (!isNative) return null;
  const offerings = await Purchases.getOfferings();
  return offerings.current ?? null;
}

function findPackage(offering: PurchasesOffering | null, plan: PlanType): PurchasesPackage | null {
  if (!offering) return null;
  const targetId = plan === 'monthly' ? PACKAGE_MONTHLY_ID : PACKAGE_YEARLY_ID;

  const byIdentifier = offering.availablePackages.find((pkg) => pkg.identifier === targetId);
  if (byIdentifier) return byIdentifier;

  const byProductId = offering.availablePackages.find((pkg) => pkg.product.identifier === targetId);
  return byProductId ?? null;
}

export const proService = {
  async loadLocalState(): Promise<ProState | null> {
    try {
      const raw = await SecureStore.getItemAsync(PRO_STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as ProState;
    } catch {
      return null;
    }
  },

  async refreshCustomerInfo(): Promise<ProState | null> {
    if (!isNative) return null;
    await ensureConfigured();
    const info = await Purchases.getCustomerInfo();
    const state = toProState(info);
    await saveState(state);
    return state;
  },

  async purchase(plan: PlanType): Promise<ProState> {
    await ensureConfigured();
    const offering = await getCurrentOffering();
    const pkg = findPackage(offering, plan);
    if (!pkg) {
      throw new Error('Package not found.');
    }

    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const state = toProState(customerInfo);
    await saveState(state);
    return state;
  },

  async restore(): Promise<{ state: ProState; hasActive: boolean }> {
    await ensureConfigured();
    const { customerInfo } = await Purchases.restorePurchases();
    const state = toProState(customerInfo);
    await saveState(state);
    return { state, hasActive: state.isPro };
  },
};
