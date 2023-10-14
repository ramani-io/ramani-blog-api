module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["airbnb-base", "prettier", "plugin:node/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
      "no-unused-vars": "warn",
      "no-console": "off",
      "func-names": "off",
      "no-plusplus": "off",
      "no-process-exit": "off",
      "class-methods-use-this": "off"
    }
}
