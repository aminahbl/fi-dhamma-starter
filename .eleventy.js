const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const i18n = require("./src/_data/i18n.js");


module.exports = function (eleventyConfig) {
  // i18n filter
  eleventyConfig.addFilter("i18n", function (key, lang = 'fi') {
    const keys = key.split('.');
    let value = i18n[lang];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // fallback to key if translation not found
      }
    }

    return value;
  });



  // human readable date with locale support
  eleventyConfig.addFilter("readableDate", (dateObj, lang = 'fi') => {
    const { config } = require("./src/_data/languages.js")();
    const locale = config[lang].locale;
    return DateTime.fromJSDate(dateObj, { zone: "utc" })
      .setLocale(locale)
      .toFormat("dd LLL yyyy");
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.js": "./admin/config.js",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");


  // Create collections for each language
  eleventyConfig.addCollection("posts_fi", function (collectionApi) {
    return collectionApi.getFilteredByTag("post_fi");
  });

  eleventyConfig.addCollection("posts_en", function (collectionApi) {
    return collectionApi.getFilteredByTag("post_en");
  });


  // URL helper for language switching
  // This filter is designed for a specific i18n structure:
  // - Finnish (fi) is the default language and does not have a URL prefix.
  // - English (en) is the secondary language and uses the /en/ URL prefix.
  // To add a new prefixed language, this logic should be extended.
  eleventyConfig.addFilter("switchLangUrl", function (url, currentLang, targetLang) {
    if (currentLang === targetLang) {
      return url;
    }

    if (currentLang === 'fi' && targetLang === 'en') {
      if (url === '/') return '/en/';
      return `/en${url}`;
    }
    if (currentLang === 'en' && targetLang === 'fi') {
      if (url === '/en/') return '/';
      const prefix = '/en';
      if (url.startsWith(prefix)) {
        return url.substring(prefix.length);
      }
    }

    // Fallback for any other cases.
    return url;
  });

  // Global data for i18n (languages comes from data file already)
  eleventyConfig.addGlobalData("i18n", i18n);

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
