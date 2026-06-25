export { formatJSON, minifyJSON, isValidJSON } from "./jsonFormatter";
export type { FormatJSONResult } from "./jsonFormatter";

export {
  toSnakeCase,
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toConstantCase,
} from "./caseConverter";

export { parseJsonToTree, searchTree, getNodePath } from "./jsonParserEngine";
export type { JsonTreeNode, JsonParseResult } from "./jsonParserEngine";

export { encodeBase64, decodeBase64, isValidBase64 } from "./base64";

export { countTextStats } from "./textCounter";
export type { TextStats } from "./textCounter";

export { computeLineDiff, diffWords } from "./diffChecker";
export type { DiffLine, DiffRow, DiffToken } from "./diffChecker";

export { decodeJwtToken } from "./jwtDecoder";
export type { DecodedJwt } from "./jwtDecoder";

export { encodeUrlString, decodeUrlString, parseUrlParams, buildUrlString } from "./urlUtility";
export type { UrlParam, ParsedUrl } from "./urlUtility";

export {
  removeDuplicateLines,
  removeEmptyLines,
  removeExtraSpaces,
  stripHtmlTags,
  sortLines,
  findAndReplace,
} from "./textCleaner";

export { minifySvg } from "./svgMinifier";

export {
  calculateAmortization,
  modelDilutionRound,
  calculateSaasLtv,
  calculateBreakEven,
} from "./financialModels";
export type {
  AmortizationPeriod,
  AmortizationSchedule,
  Shareholder,
  CapTableRound,
  SaasLtvMetrics,
  BreakEvenMetrics,
} from "./financialModels";

export { formatSql } from "./sqlFormatter";
export { generatePassword, calculatePasswordStrength } from "./passwordGenerator";
export type { PasswordOptions, PasswordStats } from "./passwordGenerator";
export { markdownToHtml, htmlToMarkdown } from "./markdown";
export { shuffleList, pickWinners } from "./randomPicker";
export { decryptPDF, isEncrypted } from "./pdfDecrypt";