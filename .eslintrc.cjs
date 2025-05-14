module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "airbnb-typescript", "next/core-web-vitals", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  plugins: [
    "perfectionist",
    "unused-imports",
    "react",
    "react-hooks",
    "@typescript-eslint",
  ],
  rules: {
    "function-paren-newline": "off",
    "implicit-arrow-linebreak": "off",
    "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
    "import/prefer-default-export": "warn",
    "jsx-a11y/anchor-is-valid": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "object-curly-newline": "off",
    "operator-linebreak": "off",
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "import/no-named-as-default": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-constructed-context-values": "off",
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        args: "none",
      },
    ],
    // unused-imports
    // https://www.npmjs.com/package/eslint-plugin-unused-imports
    "unused-imports/no-unused-imports": 1,
    "unused-imports/no-unused-vars": [
      0,
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    // perfectionist
    // https://eslint-plugin-perfectionist.azat.io/
    "perfectionist/sort-named-imports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-named-exports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-exports": [
      1,
      {
        order: "asc",
        type: "line-length",
      },
    ],
    "perfectionist/sort-imports": [
      1,
      {
        order: "asc",
        type: "line-length",
        "newlines-between": "always",

        groups: [
          ["builtin", "external"],
          "custom-mui",
          "custom-routes",
          "custom-hooks",
          "custom-utils",
          "internal",
          "custom-components",
          "custom-sections",
          "custom-types",
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
        "custom-groups": {
          value: {
            "custom-mui": "@mui/**",
            "custom-routes": "src/routes/**",
            "custom-hooks": "src/hooks/**",
            "custom-utils": "src/utils/**",
            "custom-components": "src/components/**",
            "custom-sections": "src/sections/**",
            "custom-types": "src/types/**",
          },
        },
        "internal-pattern": ["src/**"],
      },
    ],
  },
};
