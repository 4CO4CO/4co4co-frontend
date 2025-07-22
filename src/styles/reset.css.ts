import { globalStyle } from '@vanilla-extract/css';

/* Box sizing */
globalStyle('html', {
  boxSizing: 'border-box',
  height: '100%',
  width: '100%',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
});

/* Remove default margin and padding */
globalStyle(
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video',
  {
    margin: 0,
    padding: 0,
    border: 0,
    font: 'inherit',
    verticalAlign: 'baseline',
  },
);

/* Display block for HTML5 elements */
globalStyle('article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section', {
  display: 'block',
});

/* Body styles */
globalStyle('body', {
  lineHeight: '1.5',
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  height: '100%',
  width: '100%',
  backgroundColor: '#fff',
  color: '#000',
});

/* Remove list styles */
globalStyle('ol, ul', {
  listStyle: 'none',
});

/* Blockquote and quotes */
globalStyle('blockquote, q', {
  quotes: 'none',
});
globalStyle('blockquote:before, blockquote:after, q:before, q:after', {
  content: '',
});

/* Table styles */
globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

/* Button reset */
globalStyle('button', {
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
});

/* Button hover & focus */
globalStyle('button:hover, button:focus', {
  outline: 'none',
});

/* Input, textarea, select reset */
globalStyle('input, textarea, select', {
  font: 'inherit',
  color: 'inherit',
  background: 'none',
  border: 'none',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
});

/* Anchor tag reset */
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});
globalStyle('a:hover, a:focus', {
  textDecoration: 'underline',
});

/* Img max-width responsive */
globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});

/* Strong tag bold */
globalStyle('strong', {
  fontWeight: 'bold',
});
