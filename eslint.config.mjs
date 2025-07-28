import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      ".next",
      "out",
      "public/static",
      "public/assets",
      "prisma/migrations",
      "prisma/dev.db",
      "prisma/dev.db-journal",
      ".vercel",
      "app/generated/prisma/*",
    ],
  }
];

export default eslintConfig;
