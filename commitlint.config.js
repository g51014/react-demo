module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "update", "refactor", "chore", "test", "style", "revert"],
    ],
    "type-case": [2, "always", ["lower-case"]],
    "scope-empty": [2, "never"],
    "subject-case": [2, "always", ["lower-case"]],
    "subject-max-length": [2, "always", 64],
    "header-match-team-pattern": [2, "always"],
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { scope } = parsed;
          if (!/^[A-Z]+\-[0-9]+/.test(scope)) {
            return [false, "scope must fill an exist Jira ticket"];
          }
          return [true, ""];
        },
      },
    },
  ]
};
