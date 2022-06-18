const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.{js,jsx,mjs}', 'pages/**/*.{js,jsx,mjs}'],
  coverageDirectory: 'coverage'
};
module.exports = createJestConfig(customJestConfig);