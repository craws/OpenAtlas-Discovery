export const useSafeRead = function (obj:Object, index:string) :string | undefined {
  const indizes = index.split(/[.[\]"']/).filter(x => x !== '');
  return indizes.reduce((o, key) => o?.[key], obj);
};

export const useFormatDateTime = (date:string) => {
  return date?.split('T')[0];
};

export const selectedLocaleLocalStorageKey = 'oad-selected-locale';

export function getLogo () : string {
  const { $discoveryConfig } = useNuxtApp();

  const logo = ($discoveryConfig.logo ?? 'logo.svg');
  return logo;
}

export function getHeaderLogo () : string {
  const { $discoveryConfig } = useNuxtApp();

  return ($discoveryConfig.headerLogo ?? $discoveryConfig.logo) ?? '/header_logo.svg';
}
