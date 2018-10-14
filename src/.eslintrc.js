module.exports = {
  "extends": "eslint:recommended",
  "rules": {
    // enable additional rules
    "semi": ["error", "always"],

    // override default options for rules from base configurations
    //"comma-dangle": ["error", "never"],
    //"no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    "no-unused-vars": "off",
    "no-console": "off",
    "no-alert": "off",
    "no-cond-assign": "off"
  }
};