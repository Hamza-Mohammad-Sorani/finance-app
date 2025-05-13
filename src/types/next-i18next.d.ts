declare module "next-i18next" {
  export function useTranslation(ns?: string | string[]): {
    t: (key: string, options?: any) => string;
    i18n: any;
  };

  export function appWithTranslation<P extends object>(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<P>;

  export function serverSideTranslations(
    locale: string,
    namespaces?: string[],
    config?: any,
  ): Promise<{
    _nextI18Next: {
      initialI18nStore: any;
      initialLocale: string;
      userConfig: any;
    };
  }>;
}
