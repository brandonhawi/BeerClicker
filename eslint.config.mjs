import nextConfig from "eslint-config-next/core-web-vitals";
import tsConfig from "eslint-config-next/typescript";

const config = [
  ...nextConfig,
  ...tsConfig,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "src/index.tsx"],
  },
];

export default config;
