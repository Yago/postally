module.exports = (variables, css) => `
@charset "UTF-8";

${variables}

@import 'node_modules/foundation-emails/scss/util/util';
@import 'node_modules/foundation-emails/scss/global';
@import 'node_modules/foundation-emails/scss/components/normalize';
@import 'node_modules/foundation-emails/scss/grid/grid';
@import 'node_modules/foundation-emails/scss/grid/block-grid';
@import 'node_modules/foundation-emails/scss/components/alignment';
@import 'node_modules/foundation-emails/scss/components/visibility';
@import 'node_modules/foundation-emails/scss/components/typography';
@import 'node_modules/foundation-emails/scss/components/button';
@import 'node_modules/foundation-emails/scss/components/callout';
@import 'node_modules/foundation-emails/scss/components/thumbnail';
@import 'node_modules/foundation-emails/scss/components/menu';
@import 'node_modules/foundation-emails/scss/components/outlook-first';
@import 'node_modules/foundation-emails/scss/components/media-query';

${css}
  `;
