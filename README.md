# Documentation Hub

Rocket Pool Documentation Hub - Features Whitepaper, FAQs, Technical Docs, Guides and more. Is written in [Vuepress](https://v1.vuepress.vuejs.org/guide/#how-it-works) + has [emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json) and will be built out over the coming months. We welcome all contributions!

## Local Testing

If you want to test this locally, follow the next few steps:

- Clone this repo eg: `git clone git@github.com:rocket-pool/rocketpool.github.io.git ./rpdocs`
- Move into the directory: `cd rpdocs`
- Install dependencies using: `npm install` or `yarn install`
- Run the dev server which will create the site and update automatically when you make changes: `yarn dev` or `npm run dev`
- Go to `http://localhost:8080/` in your browser to view the site.

## Project Structure

Files under `/.vuepress` include [components](https://vuejs.org/v2/guide/components.html), style and configs.

To add new pages and have them appear in the side menu, add the links to the `sidebar` property in the `/.vuepress/config.js` file for them to appear.
