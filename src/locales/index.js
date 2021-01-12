import { COUNTRIES_LOCALE } from "./countries";
import { LeaguesLocale } from "./leagues";
import { Markets_Locale } from "./markets";
import { SportsLocale } from "./sports";
import { TeamsLocale } from "./teams";

const translatePhrase = (
  phraseToTranslate,
  dictionaryToFindIn,
  preferredLocaleCode = "am"
) => {
  const availableDictionaries = {
    countries: COUNTRIES_LOCALE,
    leagues: LeaguesLocale,
    markets: Markets_Locale,
    sports: SportsLocale,
    teams: TeamsLocale,
  };
  if (!phraseToTranslate) return;
  if (preferredLocaleCode !== "am") return;
  const locale = availableDictionaries[dictionaryToFindIn].find(
    (locale) => locale.en === phraseToTranslate
  );
  if (!locale) {
    return phraseToTranslate;
  } else {
    return locale[preferredLocaleCode];
  }
};

export default translatePhrase;

// return new Promise((resolve, reject) => {
//   if (!phraseToTranslate) reject("No phrase provider");
//   if (preferredLocaleCode !== "am")
//     reject("Only translations to amharic supported");
//   const locale = availableDictionaries[dictionaryToFindIn].find(
//     (locale) => locale.en === phraseToTranslate
//   );
//   if (!locale) {
//     return resolve(phraseToTranslate);
//   } else {
//     const translatedPhrase = locale[preferredLocaleCode];
//     return resolve(translatedPhrase);
//   }
// });
