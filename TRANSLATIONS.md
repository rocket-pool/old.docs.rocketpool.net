# Translation documentation

> NOTE: all translations are expected to be submitted through github pull request. If you are adding a language or file updates, do so in a separate branch and only open a pull request once your changes are final. Your pull request will be reviewed by a Rocket Pool team member.

To add a new language you need to:

1. Add the language slug to `/src/.vuepress/config.js` both under `locales` and `"/slug/": { nav }`
2. Run `npm run multilang:missing`, which creates placeholder files for the new language
3. Translate all files that begin with `.TODO.`
