import i18nSchema from './i18n-schema.js';

const config = {
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },
  media_folder: 'src/static/img',
  public_folder: '/static/img',
  local_backend: true,
  collections: [
    {
      label: 'Blog (Finnish)',
      name: 'blog_fi',
      folder: 'src/fi/posts',
      create: true,
      editor: {
        preview: false,
      },
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Description', name: 'description', widget: 'string' },
        { label: 'Author', name: 'author', widget: 'string' },
        { label: 'Publish Date', name: 'date', widget: 'datetime' },
        { label: 'Body', name: 'body', widget: 'markdown' },
        {
          widget: 'select',
          label: 'tags',
          name: 'tags',
          multiple: true,
          create: true,
          options: ['Tags', 'created', 'from', 'config.yml'],
        },
      ],
    },
    {
      label: 'Blog (English)',
      name: 'blog_en',
      folder: 'src/en/posts',
      create: true,
      editor: {
        preview: false,
      },
      fields: [
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Description', name: 'description', widget: 'string' },
        { label: 'Author', name: 'author', widget: 'string' },
        { label: 'Publish Date', name: 'date', widget: 'datetime' },
        { label: 'Body', name: 'body', widget: 'markdown' },
        {
          widget: 'select',
          label: 'tags',
          name: 'tags',
          multiple: true,
          create: true,
          options: ['Tags', 'created', 'from', 'config.yml'],
        },
      ],
    },
    {
      label: 'Translations',
      name: 'i18n',
      editor: {
        preview: false,
      },
      files: [
        {
          label: 'Finnish',
          name: 'fi',
          file: 'src/_data/fi.js',
          format: 'javascript',
          extension: 'js',
          fields: i18nSchema,
        },
        {
          label: 'English',
          name: 'en',
          file: 'src/_data/en.js',
          format: 'javascript',
          extension: 'js',
          fields: i18nSchema,
        },
      ],
    },
  ],
};

export default config;
