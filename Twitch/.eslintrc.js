module.exports = {
    "extends": "airbnb",
    "rules": {
        "comma-dangle": [1, "never"], // 不对数组或对象末尾逗号做强制要求
        "spaced-comment": [0, "always"], // 不对注释前的空格做强制要求
        "func-names": 0, // 允许使用匿名函数
        "indent": [2, 4],  //indent 4 space
        "react/jsx-indent": [0, 0],  //关闭jsx indent
        "import/no-unresolved": [0, {commonjs: true, amd: true}],//关闭unresolve  检查
        "no-trailing-spaces": ["error", { "skipBlankLines": true }]//if a line is zero-length after being trimmed of whitespace, then the rule will not flag that line when skipBlankLines is enabled.
    }
}
