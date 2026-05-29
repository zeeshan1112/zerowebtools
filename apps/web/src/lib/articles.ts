export interface HowToArticle {
  slug: string;
  title: string;
  metaDescription: string;
  toolId: string;
  sections: {
    heading: string;
    level?: "h2" | "h3";
    paragraphs?: string[];
    listItems?: string[];
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

import { HOW_TO_ARTICLES as combinedArticles } from "./articles/index";
export const HOW_TO_ARTICLES = combinedArticles;
