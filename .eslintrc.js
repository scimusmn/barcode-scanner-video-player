module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    quotes: "off",
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",
    "comma-dangle": "off",
  },
};
