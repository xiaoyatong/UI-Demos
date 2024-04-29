module.exports = {
  // webpack: {
  //   test: /\.(sa|sc)ss$/,
  //   use: [
  //     {
  //       loader: "sass-loader",
  //       options: {
  //         // 注意：在 sass-loader 不同版本，这个选项名是 是不一样的，具体可参考 sass-loader对应的版本文档
  //         data: `@import "@nutui/nutui-react/dist/styles/variables.scss";`,
  //       },
  //     },
  //   ],
  // },
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "@nutui/nutui-react",
          libraryDirectory: "dist/esm",
          style: "css",
          camel2DashComponentName: false,
        },
        "nutui-react",
      ],
    ],
  },
};
