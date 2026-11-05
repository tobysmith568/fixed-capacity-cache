import recommended from "@tobysmith568/eslint-config";
import jest from "@tobysmith568/eslint-config/jest";
import node from "@tobysmith568/eslint-config/node";
import prettier from "@tobysmith568/eslint-config/prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**"] },
  recommended,
  node,
  { files: ["tests/**/*.ts"], extends: [jest] },
  prettier
]);
