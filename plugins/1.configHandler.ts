// =========================================================================================
// The 1. is needed to ensure that this is the first plugin loaded by nuxt
// and thus available to other plugins in the project.
// See: https://nuxt.com/docs/guide/directory-structure/plugins#plugin-registration-order
// =========================================================================================
import discoveryConfig from '../discoveryConfig.json';

interface GlobalConfig {
  defaultLocale: string,
  dateTimeFormat?: string
}

export interface DiscoveryConfig {
  global: GlobalConfig
}

export default defineNuxtPlugin(() => {
  const config: DiscoveryConfig = discoveryConfig as DiscoveryConfig;

  return {
    provide: {
      discoveryConfig: config
    }
  };
});

declare module '#app' {
  interface NuxtApp {
    $discoveryConfig : DiscoveryConfig
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $discoveryConfig: DiscoveryConfig
  }
}
export { };
