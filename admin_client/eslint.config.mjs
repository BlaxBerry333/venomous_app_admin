import js from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "dist",
      "public/",
      "yarn.lock",
      "build",
      "coverage",
      ".husky/",
      ".vscode/",
      "*.html",
      "storybook-static/**",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/query": pluginQuery,
      "unused-imports": unusedImports,
    },
    rules: {
      // react
      "react/display-name": "off",
      "react/prop-types": "off",

      // react-hooks
      ...reactHooks.configs.recommended.rules,

      // react-refresh
      "react-refresh/only-export-components": "off",

      // @tanstack/query
      "@tanstack/query/exhaustive-deps": "error",

      // unused-imports
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "off",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [{ group: ["../../"], message: "Please use relative imports instead" }],
        },
      ],
    },
  },
);
