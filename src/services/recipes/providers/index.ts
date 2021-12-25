import { DefaultProvider } from './default';
import { AniaStarmachProvider } from './websites/aniastarmach';
import { BeszamelProvider } from './websites/beszamel';
import { KwestiaSmakuProvider } from './websites/kwestiasmaku';

// https://www.mniammniam.com/kurczak-slodko-kwasny
// https://beszamel.se.pl/przepisy/dania-glowne-miesne/prosty-kurczak-w-sosie-slodko-kwasnym-gotowy-w-30-minut-re-iB8s-pmcM-Rz5i.html
// https://www.doradcasmaku.pl/przepis-soczysty-kurczak-w-sosie-slodko-kwasnym--349850

export interface Recipe {
  name: string;
  image?: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: string; // ISO-8601 Duration
  color?: string;
  url: string;
  rating?: number;
  calories?: number;
  tags: string[];
  servings?: number;
}

export type RecipeScrapper = (doc: Document, url: string) => Promise<Recipe>;

export interface Provider {
  name?: string;
  url?: string;
  icon?: string;
  scrapper: RecipeScrapper;
}

export const chooseProvider = (url: string): Provider => {
  switch (new URL(url).host) {
    case KwestiaSmakuProvider.url:
      return KwestiaSmakuProvider;

    case BeszamelProvider.url:
      return BeszamelProvider;

    case AniaStarmachProvider.url:
      return AniaStarmachProvider;

    default:
      return DefaultProvider;
  }
};

export const scrapeRecipe = async (url: string): Promise<Recipe> => {
  const data = await fetch(process.env.REACT_APP_CORS_PROXY + url, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  }).then((res) => res.text());

  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  const provider = chooseProvider(url);
  const recipe = await provider.scrapper(doc, url);

  return recipe;
};

export const getRecipeId = (url: string) => {
  const urlObject = new URL(url);

  return urlObject.hostname + urlObject.pathname;
};
