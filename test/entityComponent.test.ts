import { fileURLToPath } from 'node:url';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { setup, $fetch } from '@nuxt/test-utils';
import EntityBasics from 'components/Entity/EntityBasics.vue';
import { LinkedPlacesModelDescriptions } from '~~/composables/api';

describe('Entity Components', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../', import.meta.url))
  });

  it('should render description if available', () => {
    const title = 'Test title';

    const descriptions: Array<LinkedPlacesModelDescriptions> =
      new Array<LinkedPlacesModelDescriptions>({
        value: 'Test Description'
      });

    const wrapper = mount(EntityBasics, {
      props: { title, descriptions }
    });

    const testText = title + descriptions.toString();

    expect(wrapper.text).toBe(testText);
  });
});
