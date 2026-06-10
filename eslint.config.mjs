import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "backend/**",
      "next-env.d.ts",
      "webflow-export/**",
      "parse_playlists.js",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Webflow CSS files are loaded as static assets — webpack-bundling breaks url('../images/...') resolution
      "@next/next/no-css-tags": "off",
      // Webflow fonts are loaded alongside Webflow CSS — must stay in <head>
      "@next/next/no-page-custom-font": "off",
      // CMS images come from arbitrary user-controlled URLs; gallery/font images use Webflow srcSet patterns
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
