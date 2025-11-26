import config from '../tamagui.config';

describe('tamagui config', () => {
  it('defines neon colors', () => {
    expect(config.tokens.color.neonGreen.val).toBe('#39FF14');
    expect(config.tokens.color.neonPink.val).toBe('#FF00FF');
  });
});
