export const TOOL_ARTICLES_I18N: Record<string, any> = {};

export function getToolArticle(lang: string, toolId: string) {
  if (!TOOL_ARTICLES_I18N[lang] || !TOOL_ARTICLES_I18N[lang][toolId]) {
    // If not found in i18n file, just return null so it falls back to generateFallbackArticle
    return undefined;
  }
  return TOOL_ARTICLES_I18N[lang][toolId];
}
