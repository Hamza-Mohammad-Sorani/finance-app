import createCache from '@emotion/cache';
import stylisRTLPlugin from 'stylis-plugin-rtl';

// ----------------------------------------------------------------------

function createEmotionCache(lang: string) {
  return createCache({
    key: `mui-style-${lang === 'ar' && 'rtl'}`,
    stylisPlugins: lang === 'ar' ? [stylisRTLPlugin] : [],
  });
}

// ----------------------------------------------------------------------

export default createEmotionCache;
