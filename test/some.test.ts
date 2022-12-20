import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

describe('some test', async () => {
  await setup({});

  it('some it', () => {
    expect(1).toBe(1);
  });
});
