import es from "../locales/es.json";
import de from "../locales/de.json";
import fr from "../locales/fr.json";
import pt from "../locales/pt.json";
import ja from "../locales/ja.json";
import zh from "../locales/zh.json";
import hi from "../locales/hi.json";
import it from "../locales/it.json";
import ar from "../locales/ar.json";
import { SupportedLocale } from "./i18n";

export const LOCALES_DATA: Record<Exclude<SupportedLocale, "en">, any> = {
  es,
  de,
  fr,
  pt,
  ja,
  zh,
  hi,
  it,
  ar,
};
