import React from 'react';
import { ThemeProvider } from './src/context/theme/theme-context';

// import tailwindcss
import './src/css/index.css';
import './src/css/article-body.css';
import './src/css/profile.css';

// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';
// normalize CSS across browsers
// import './src/normalize.css';
// custom CSS styles
// import './src/style.css';

// Highlighting for code blocks
// import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-tomorrow.min.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export const wrapRootElement = ({ element }) => {
    return <ThemeProvider>{element}</ThemeProvider>;
};
