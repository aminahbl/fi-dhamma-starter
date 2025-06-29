# NEAT Stack Data Flow Explained

Understanding how data flows through the NEAT stack can be confusing at first. Here's a clear breakdown:

## The Stack Components

- **N**etlify CMS (Decap CMS) - Content Management
- **E**leventy (11ty) - Static Site Generator  
- **A**lpine.js - Frontend JavaScript Framework
- **T**ailwind CSS - Utility-first CSS Framework

## Data Flow Overview

```
1. Content (Markdown + YAML) → 2. Eleventy Processing → 3. Static HTML → 4. Browser
```

## Detailed Data Flow

### 1. **Content Sources** 
```
src/_data/           ← Global data (available everywhere)
├── i18n.js         ← Translation strings
├── languages.js    ← Language configuration  
├── navigation.yaml ← Navigation menu items
├── quicklinks.yaml ← Homepage quick links
└── settings.yaml   ← Site settings

src/[lang]/posts/   ← Blog posts (Markdown files)
├── *.md            ← Individual blog posts with frontmatter
```

### 2. **Eleventy Processing** (.eleventy.js)
```javascript
// Eleventy reads all data and processes it:

// Global Data (available in ALL templates)
eleventyConfig.addGlobalData("languages", languages);
eleventyConfig.addGlobalData("i18n", i18n);

// Filters (transform data in templates)
eleventyConfig.addFilter("i18n", function(key, lang) {
  // {{ "nav.home" | i18n(lang) }} → "Etusivu" or "Home"
});

// Collections (group content)
eleventyConfig.addCollection("posts_fi", function(collectionApi) {
  return collectionApi.getFilteredByTag("post_fi");
});
```

### 3. **Template Processing**

#### How Variables Get to Templates:
```
Page Template (e.g., src/fi/index.html)
├── Frontmatter (lang: fi, title: "...")
├── Global Data (languages, i18n)  
├── Collections (posts_fi, posts_en)
└── Page Data (page.url, page.date, etc.)
```

#### Template Variable Access:
```html
<!-- In any template file: -->

<!-- From frontmatter -->
{{ lang }}                    <!-- 'fi' or 'en' -->
{{ title }}                   <!-- Page title -->

<!-- From global data -->
{{ languages.supported }}     <!-- ['fi', 'en'] -->
{{ i18n.fi.nav.home }}       <!-- "Etusivu" -->

<!-- Using filters -->
{{ "nav.home" | i18n(lang) }} <!-- Translates based on current lang -->

<!-- From collections -->
{% for post in collections.posts_fi %}
  {{ post.data.title }}
{% endfor %}

<!-- From page object -->
{{ page.url }}                <!-- Current page URL -->
```

### 4. **Include System**

Templates can include other templates:
```html
<!-- In src/_includes/default.html (main layout) -->
<body>
  {% include "partials/navbar.html" %}  ← Includes navbar
  {{ content | safe }}                  ← Page content goes here
  {% include "partials/footer.html" %}  ← Includes footer
</body>

<!-- In src/_includes/partials/navbar.html -->
{% include "./language-switcher.html" %} ← Includes language switcher
```

## Your Language Switcher Issue

The duplication was happening because:

1. **Language Detection**: `{{ lang or 'fi' }}` means "use `lang` if it exists, otherwise use 'fi'"
2. **Loop Logic**: The `{% for langCode in languages.supported %}` loops through `['fi', 'en']`
3. **Filter Logic**: `{% if langCode != (lang or 'fi') %}` should exclude current language

**The Problem**: If `lang` wasn't being set correctly, the logic would fail.

## How Language Gets Set

```html
<!-- In page frontmatter (src/fi/index.html) -->
---
lang: fi
---

<!-- In page frontmatter (src/en/index.html) -->  
---
lang: en
---
```

This `lang` variable becomes available in ALL templates for that page.

## Debugging Tips

1. **Check what variables are available**:
```html
<!-- Add this temporarily to any template -->
<pre>{{ lang | dump }}</pre>
<pre>{{ languages | dump }}</pre>
<pre>{{ page | dump }}</pre>
```

2. **Check Eleventy build output**:
```bash
npm run build
# Look at generated files in _site/ folder
```

3. **Check browser console**:
- Alpine.js errors will show here
- Network tab shows what files are loading

## File Structure Summary

```
src/
├── _data/              ← Global data (available everywhere)
├── _includes/          ← Reusable templates  
│   ├── default.html    ← Main layout
│   └── partials/       ← Smaller components
├── fi/                 ← Finnish content
│   ├── index.html      ← Homepage (permalink: /)
│   └── posts/          ← Finnish blog posts
├── en/                 ← English content  
│   ├── index.html      ← Homepage (permalink: /en/)
│   └── posts/          ← English blog posts
└── admin/              ← Decap CMS config
```

The key insight: **Everything flows through Eleventy**, which processes all data and templates to generate static HTML files.
