import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

const rtlPlugin = (element: any) => {
  if (
    (element.type === "rule" && element.value.includes("margin")) ||
    element.value.includes("padding")
  ) {
    element.value = element.value
      .replace(/left/g, "start")
      .replace(/right/g, "end");
  }
  return element;
};

export default function createEmotionCache(rtl: boolean) {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({
    key: "mui-style",
    insertionPoint,
    prepend: true,
    stylisPlugins: rtl ? [rtlPlugin] : [],
  });
}
