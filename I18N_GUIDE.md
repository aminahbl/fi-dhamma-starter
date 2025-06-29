# Internationalization (i18n) Guide

This project uses a schema-driven approach to manage translations, ensuring that all language files and the CMS configuration remain in sync. This guide explains how the system works and how to manage content.

## File Structure

The core of the i18n system is located in two main areas:

-   `src/_data/`: This directory contains the language files (`fi.js`, `en.js`, etc.) that store the actual translation strings.
-   `src/admin/`: This directory contains the CMS configuration and the translation schema.

Key files:
-   `src/_data/fi.js`: Contains all Finnish translation strings.
-   `src/_data/en.js`: Contains all English translation strings.
-   `src/admin/i18n-schema.js`: The **single source of truth** for all translation keys. This file defines the structure of the translations and is used to generate the CMS interface.
-   `src/admin/config.js`: The main CMS configuration file. It imports the schema to dynamically build the translation fields.

## How to Add or Modify Translation Keys

To add, remove, or rename a translation key, you only need to edit one file: `src/admin/i18n-schema.js`.

### Example: Adding a "Read More" Button

1.  **Open the Schema File**:
    Navigate to `src/admin/i18n-schema.js`.

2.  **Add the New Key**:
    Add a new object to the `i18nSchema` array. The object requires three properties:
    -   `label`: The human-readable label that will appear in the CMS.
    -   `name`: The key for the translation, using dot notation (e.g., `blog.readMore`).
    -   `widget`: The type of input field to use in the CMS (e.g., `string` for a single line of text, `text` for a textarea).

    ```javascript
    // src/admin/i18n-schema.js
    const i18nSchema = [
      // ... existing keys
      { label: 'Blog: Read More', name: 'blog.readMore', widget: 'string' },
    ];
    ```

3.  **Update the Language Files**:
    The new key will now appear in the CMS under the "Translations" collection. A content editor can now go into the CMS and provide the Finnish and English text for the "Read More" button.

    Alternatively, you can add the key and its translation directly to the data files:

    ```javascript
    // src/_data/fi.js
    module.exports = {
      // ...
      blog: {
        // ...
        readMore: 'Lue lisää',
      },
    };
    ```

    ```javascript
    // src/_data/en.js
    module.exports = {
      // ...
      blog: {
        // ...
        readMore: 'Read more',
      },
    };
    ```

4.  **Use the Key in a Template**:
    You can now use the new key in your templates with the `i18n` filter:

    ```html
    <a href="{{ post.url }}">{{ 'blog.readMore' | i18n(lang) }}</a>
    ```

## How to Edit Content in the CMS

Content editors can easily update translations without touching any code:

1.  **Log in to the CMS**:
    Access the CMS at `/admin/`.

2.  **Navigate to the Translations Collection**:
    In the left-hand sidebar, click on the "Translations" collection.

3.  **Select a Language**:
    You will see two items: "Finnish" and "English". Click on the language you wish to edit.

4.  **Update the Fields**:
    The CMS will display a form with all the available translation keys, as defined in the schema. Make your changes and click "Save". The changes will be committed directly to the corresponding language file in the repository.

This NEAT starter template now supports multilingual content with Finnish as the default language and English as a secondary option.

## Features

- 🇫🇮 **Finnish (Default)**: `/fi/` - Primary language with full content
- 🇬🇧 **English**: `/en/` - Secondary language with translated content
- 🔄 **Language Switching**: Dynamic language switcher in navigation
- 📝 **Multilingual CMS**: Separate content collections for each language
- 🎨 **Localized UI**: All interface elements translated
- 🌐 **SEO Friendly**: Proper hreflang tags and language-specific URLs

## URL Structure

```
/ → Finnish homepage (default, no prefix)
/en/ → English homepage
/blog/ → Finnish blog listing (default, no prefix)
/en/blog/ → English blog listing
/posts/[slug]/ → Finnish blog posts (default, no prefix)
/en/posts/[slug]/ → English blog posts
```

## File Structure

```
src/
├── _data/
│   ├── i18n.js          # Translation strings
│   └── languages.js     # Language configuration
├── _includes/
│   ├── partials/
│   │   └── language-switcher.html  # Language switcher component
│   └── default.html     # Updated with i18n support
├── fi/                  # Finnish content
│   ├── index.html       # Finnish homepage
│   ├── blog/
│   │   └── index.html   # Finnish blog listing
│   └── posts/           # Finnish blog posts
│       └── *.md
├── en/                  # English content
│   ├── index.html       # English homepage
│   ├── blog/
│   │   └── index.html   # English blog listing
│   └── posts/           # English blog posts
│       └── *.md
└── admin/
    └── config.yml       # Updated CMS config with language collections
```

## Translation System

### Adding New Translations

Edit `src/_data/i18n.js` to add new translation keys:

```javascript
module.exports = {
  fi: {
    nav: {
      home: "Etusivu",
      blog: "Blogi"
    }
  },
  en: {
    nav: {
      home: "Home", 
      blog: "Blog"
    }
  }
};
```

### Using Translations in Templates

Use the `i18n` filter with dot notation:

```html
{{ "nav.home" | i18n(lang) }}
```

The `lang` variable is automatically available in templates based on the page's language setting.

## Content Management

### Netlify CMS

The CMS now has separate collections for each language:
- **Blog (Finnish)**: Manages content in `src/fi/posts/`
- **Blog (English)**: Manages content in `src/en/posts/`

### Creating New Posts

1. **Via CMS**: Use the appropriate language collection
2. **Manually**: Create `.md` files in the correct language folder with proper frontmatter:

```yaml
---
title: Your Post Title
description: Post description
author: Author Name
date: 2024-06-28
lang: fi  # or 'en'
tags:
  - post
  - post_fi  # or 'post_en'
---
```

## Language Switching

The language switcher component automatically:
- Shows the current language with flag
- Provides dropdown to switch languages
- Maintains the same page type when switching (home→home, blog→blog)
- Uses Alpine.js for smooth interactions

## Eleventy Configuration

Key i18n features added to `.eleventy.js`:

- **i18n Filter**: `{{ "key" | i18n(lang) }}`
- **Language Collections**: `collections.posts_fi`, `collections.posts_en`
- **URL Helpers**: `otherLangUrl` filter for language switching
- **Localized Date Formatting**: `readableDate` with locale support

## Adding New Languages

To add a new language (e.g., Swedish):

1. **Update language config** in `src/_data/languages.js`:
```javascript
supported: ['fi', 'en', 'sv'],
config: {
  sv: {
    code: 'sv',
    name: 'Svenska',
    flag: '🇸🇪',
    dir: 'ltr',
    locale: 'sv-SE'
  }
}
```

2. **Add translations** in `src/_data/i18n.js`
3. **Create content structure**: `src/sv/` with `index.html`, `blog/`, `posts/`
4. **Update CMS config** with new collection
5. **Add Eleventy collection**: `collections.posts_sv`

## SEO Considerations

- Each page includes proper `hreflang` tags
- Language-specific meta descriptions
- Canonical URLs for each language version
- Proper HTML `lang` attributes

## Development

- **Build**: `npm run build`
- **Dev Server**: `npm start`
- **CMS**: Access at `/admin/` when running locally

The i18n system is fully integrated with the existing NEAT stack and maintains all original functionality while adding comprehensive multilingual support.
