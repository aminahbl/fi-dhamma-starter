// This schema defines the structure of translation files (src/_data/fi.js and src/_data/en.js).
// It's used to dynamically generate the fields in the Decap CMS configuration.

const i18nSchema = [
    { label: 'Site Title', name: 'site.title', widget: 'string' },
    { label: 'Site Description', name: 'site.description', widget: 'text' },
    { label: 'Site Author', name: 'site.author', widget: 'string' },
    { label: 'Nav: Home', name: 'nav.home', widget: 'string' },
    { label: 'Nav: Blog', name: 'nav.blog', widget: 'string' },
    { label: 'Nav: About', name: 'nav.about', widget: 'string' },
    { label: 'Nav: Contact', name: 'nav.contact', widget: 'string' },
    { label: 'Home: Welcome', name: 'home.welcome', widget: 'string' },
    { label: 'Home: Subtitle', name: 'home.subtitle', widget: 'string' },
    { label: 'Home: Description', name: 'home.description', widget: 'text' },
    { label: 'Blog: Title', name: 'blog.title', widget: 'string' },
    { label: 'Blog: Read More', name: 'blog.readMore', widget: 'string' },
    { label: 'Blog: Published On', name: 'blog.publishedOn', widget: 'string' },
    { label: 'Blog: By', name: 'blog.by', widget: 'string' },
    { label: 'Footer: Made With', name: 'footer.madeWith', widget: 'string' },
    { label: 'Footer: And', name: 'footer.and', widget: 'string' },
    { label: 'UI: Language', name: 'ui.language', widget: 'string' },
    { label: 'UI: Switch Language', name: 'ui.switchLanguage', widget: 'string' },
];

module.exports = i18nSchema;
