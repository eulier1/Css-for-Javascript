import { defineRouting } from "next-intl/routing";

const isExport = process.env.BUILD_EXPORT === "true";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  // Environment-specific settings
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/introduction": "/introduction",
  },
});
