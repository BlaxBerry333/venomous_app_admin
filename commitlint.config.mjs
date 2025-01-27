const customRules = {
  "type-empty": ({ type }) => {
    if (!type) {
      return [false, "类型不能为空"];
    }
    return [true];
  },

  "type-enum": ({ type }) => {
    const supportedCommitTypes = [
      "feat",
      "fix",
      "refactor",
      "perf",
      "docs",
      "style",
      "test",
      "build",
      "ci",
      "chore",
      "revert",
    ];
    if (type && !supportedCommitTypes.includes(type)) {
      return [false, `类型 ${type} 无效`];
    }
    return [true];
  },

  "header-max-length": ({ header }) => {
    if (header && header.length > 100) {
      return [false, "信息的长度应小于 100 个字符"];
    }
    return [true];
  },

  "subject-empty": ({ subject }) => {
    if (!subject) {
      return [false, "信息不能为空"];
    }
    return [true];
  },

  "subject-case": () => {
    return [true];
  },
};

export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+): (.*)$/,
      headerCorrespondence: ["type", "subject"],
    },
  },
  plugins: [
    {
      rules: customRules,
    },
  ],
};
