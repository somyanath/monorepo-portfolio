// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/storybook-static/**'] },
  js.configs.recommended,
  ...storybook.configs["flat/recommended"]
];
