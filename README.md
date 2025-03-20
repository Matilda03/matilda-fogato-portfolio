## Overview
This project uses the [Content Wind](https://github.com/atinux/content-wind) theme for building a personal website. 
It includes Markdown-based pages, code highlighting, responsive design, and light/dark modes.

> [!IMPORTANT]
> This is not an original theme. It is a customization of a theme developed by [Atinux](https://atinux.com/).

## Custom Components
### Hero Section
Displays a full\-screen introduction section with a random network animation in the background.

### Article Card
Renders a summarized version of a blog article or content entry, including title, excerpt, and a link to read more.

### Two-Column Grid 
Displays a column of text on the left and an image on the right, used to construct the "About Me" section.

## Usage
Add or edit pages in the `content/` directory. Update the global configuration in `app.config.ts`. Modify or extend styles in `tailwind.config.js` or `main.css`. Use the custom components above by importing them into Vue pages and inserting them in the template.

## Deployment
Generate a static build:
```bash
npm run generate
```
Or serve via Node:
```bash
npm run build
npm run start
```

## License
Refer to the `LICENSE` file for more information.