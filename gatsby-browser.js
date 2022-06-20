import * as React from 'react';
import { ThemeProvider } from './src/context/theme/theme-context';
// import type { GatsbyBrowser } from 'gatsby';

// import tailwindcss
import './src/css/index.css';
import './src/css/article-body.css';
import './src/css/profile.css';

// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

// Highlighting for code blocks
import 'prismjs/themes/prism-tomorrow.min.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// : GatsbyBrowser['wrapPageElement']
export const wrapRootElement = ({ element }) => {
    return <ThemeProvider>{element}</ThemeProvider>;
};
