import { HowToArticle } from "../articles";
import { PDF_ARTICLES } from "./pdf";
import { IMAGE_ARTICLES } from "./image";
import { DEVTOOLS_ARTICLES } from "./devtools";
import { FINANCE_ARTICLES } from "./finance";
import { GENERATORS_ARTICLES } from "./generators";
import { TEXT_ARTICLES } from "./text";
import { FUN_ARTICLES } from "./fun";

export const HOW_TO_ARTICLES: HowToArticle[] = [
  ...PDF_ARTICLES,
  ...IMAGE_ARTICLES,
  ...DEVTOOLS_ARTICLES,
  ...FINANCE_ARTICLES,
  ...GENERATORS_ARTICLES,
  ...TEXT_ARTICLES,
  ...FUN_ARTICLES,
];
