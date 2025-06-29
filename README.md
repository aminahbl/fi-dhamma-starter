# Neat Starter

Starter Template for **N**etlify CMS, **E**leventy, **A**lpine JS & **T**ailwind CSS

## Live Demo

[https://neat-starter.netlify.app/](https://neat-starter.netlify.app/)

### Technologies used:

- [Netlify CMS](https://www.netlifycms.org/)
- [Eleventy](https://www.11ty.dev/)
- [Alpine.js](https://github.com/alpinejs/alpine)
- [Tailwind CSS](https://tailwindcss.com/)

| ![image](https://user-images.githubusercontent.com/1884712/93762662-a62e4700-fc2d-11ea-9b2c-fda9f503402b.png) |
| ------------------------------------------------------------------------------------------------------------- |


<a href="https://app.netlify.com/start/deploy?repository=https://github.com/surjithctly/neat-starter&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" /></a>

## Getting Started

Detailed instructions are available in my blog. [Check it out](https://blog.surjithctly.in/neat-stack-create-a-static-website-with-netlify-cms-eleventy-alpinejs-and-tailwindcss)

### 1\. Clone this Repository

```
git clone https://github.com/surjithctly/neat-starter.git
```

### 2\. Navigate to the directory

```
cd neat-starter
```

### 3\. Install dependencies

```
npm install
```

### 4\. Build the project to generate the first CSS

This step is only required the very first time.

```
npm run build
```

### 5\. Run Eleventy

```
npm run start
```

## Internationalization (i18n)

This starter template includes comprehensive multilingual support with Finnish as the default language and English as a secondary option.

### Features

- 🇫🇮 **Finnish (Default)**: Root URLs (`/`, `/blog/`) serve Finnish content
- 🇬🇧 **English**: Prefixed URLs (`/en/`, `/en/blog/`) serve English content
- 🔄 **Language Switching**: Interactive language switcher in navigation
- 📝 **Multilingual CMS**: Separate Decap CMS collections for each language
- 🎨 **Localized UI**: All interface elements translated via `i18n` system
- 🌐 **SEO Friendly**: Proper hreflang tags and language-specific meta data

### URL Structure

```
/              → Finnish homepage (default)
/en/           → English homepage
/blog/         → Finnish blog listing
/en/blog/      → English blog listing
/posts/[slug]/ → Finnish blog posts
/en/posts/[slug]/ → English blog posts
```

### Content Management

**Decap CMS Collections:**
- **Blog (Finnish)**: Manages content in `src/fi/posts/`
- **Blog (English)**: Manages content in `src/en/posts/`
- **UI & Content**: Manages translations and site settings

**Translation System:**
Edit translations in `src/_data/i18n.js` and use in templates:
```html
{{ "nav.home" | i18n(lang) }}
```

### Adding New Languages

1. Update `src/_data/languages.js` with new language config
2. Add translations to `src/_data/i18n.js`
3. Create content structure: `src/[lang]/` with `index.html`, `blog/`, `posts/`
4. Update Eleventy config with new collection
5. Add CMS collection for new language

For detailed i18n documentation, see `I18N_GUIDE.md`.

## Author

Surjith S M ( [@surjithctly](https://surjithctly.in/) )
