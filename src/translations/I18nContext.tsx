import { useContext } from "react";
import I18n from "i18n-js";

import en from "./en.json";

I18n.fallbacks = true;

// todo: It is not available until LanguageContext is set on Setting Page.
// const languageContext = useContext(LanguageContext);
// I18n.locale = languageContext;

//Availale languages
I18n.translations = {
  en: en,
};

function getString(key: string) {
  return I18n.t(key);
}

export default {
  getString,
};
