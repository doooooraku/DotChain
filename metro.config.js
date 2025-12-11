const { getDefaultConfig } = require('expo/metro-config');

// Expo が用意している標準設定をベースにする
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('wasm');
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'wasm');

module.exports = config;
