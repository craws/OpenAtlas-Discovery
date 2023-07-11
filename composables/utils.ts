export const useSafeRead = function (obj:Object, index:string) :string | undefined {
  const indizes = index.split(/[.[\]"']/).filter(x => x !== '');
  return indizes.reduce((o, key) => o?.[key], obj);
};

export const useFormatDateTime = (date:string) => {
  return date?.split('T')[0];
};

export function getLogo(getHeaderLogo = false) : string {
  const { $discoveryConfig } = useNuxtApp();

  const headerLogo = ( $discoveryConfig.headerLogo ?? $discoveryConfig.logo ) ??  '/header_logo.svg';
  const logo = getHeaderLogo ? headerLogo : ($discoveryConfig.logo ?? 'logo.svg');
  return logo;
}
