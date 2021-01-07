// preferred language is the choosen language by the user
// wordCatagory E.g. team, league, country ...
// word is the word to be translated
// const useGetPreferredWord = (
//   preferredLanguage,
//   localeCategory,
//   wordToTranslate
// ) => {
//   const locales = { team: teamLocale, league: leagueLocale };
//   if (preferredLanguage === "en") return wordToTranslate;
//   else {
//     return locales[localeCategory].find(
//       (wordLocale) => wordLocale.en === wordToTranslate
//     )[preferredLanguage];
//   }
// };
import translate from "translate-google-api";

// export const getTranslation = async (
//   phraseToTranslate,
//   selectedLocale = "am"
// ) => {
//   const url =
//     "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
//     "en" +
//     "&tl=" +
//     selectedLocale +
//     "&dt=t&q=" +
//     encodeURI(phraseToTranslate);
//   console.log("inside translation functions");
//   try {
//     const response = await fetch(url);
//     const responseJson = await response.json();
//     console.log(response);
//     console.log(responseJson);
//   } catch (error) {
//     console.log(error);
//   }
//   // .then((response) => response.json())
//   // .then((r) => console.log(r))
//   // .catch((e) => console.log(e));
// };

export const getTranslation = async () => {
  fetch("https://yandextranslatezakutynskyv1.p.rapidapi.com/translate", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": "a4ebbd7592msh219ce8df601aa6dp18eab4jsn40681063bfa9",
      "x-rapidapi-host": "YandexTranslatezakutynskyV1.p.rapidapi.com",
    },
    body: {
      apiKey: "undefined",
      lang: "am",
      text: "hi",
    },
  })
    .then((response) => {
      response.json();
    })
    .then((r) => console.log(r))
    .catch((err) => {
      console.error(err);
    });
};
