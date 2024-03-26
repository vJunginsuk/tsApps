module.exports = {
  globals: {
    __dirname: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "@typescript-eslint",
    "prettier",
  ],
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    // 파일의 경로가 틀렸는지 확인하는 옵션 false
    "import/no-unresolved": 0,
    // 사용하지 않는 import 제거
    "unused-imports/no-unused-imports": 0,
    "unused-imports/no-unused-vars": 0,
    // var 금지
    "no-var": "warn",
    // 컴포넌트의 props 검사 비활성화, propstype 사용하지 않아도 경고 띄우지 않음
    "react/prop-types": 0,
    // 콘솔 사용 시 발생하는 경고 비활성화
    "no-console": 0,
    // react hooks의 의존성배열이 충분하지 않을 때 경고 표시
    "react-hooks/exhaustive-deps": 0,
    "prettier/prettier": 0,
    "react/react-in-jsx-scope": 0,
    // any 타입 경고 off
    "@typescript-eslint/no-explicit-any": 0,
    // underscore 경고 off
    "no-underscore-dangle": 0,
    // no-params-reassign 경고 off
    "no-param-reassign": 0,
    "consistent-return": 0,
    // namespace 에러
    "import/namespace": 0,
    // @ts-expect-error 에러
    "@typescript-eslint/ban-ts-comment": 0,
    // 단항 연산자 ++,-- 허용
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    // import 순서
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
    // import/named error
    "import/named": 0,
  },
};
