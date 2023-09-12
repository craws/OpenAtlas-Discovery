import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
import { ThemeDefinition } from 'vuetify';
import discoveryConfig from './config/discoveryConfig.json';
import { DiscoveryConfig } from './config/discoveryConfig';

const config = (discoveryConfig as DiscoveryConfig);

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#b8cf5b'
  }
};

if (config.primaryColor) {
  lightTheme.colors!.primary = config.primaryColor;
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2
    }
  }
});
