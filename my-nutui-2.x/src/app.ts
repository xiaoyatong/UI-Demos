import React, { useEffect } from "react";
import { useDidShow, useDidHide } from "@tarojs/taro";
// import VConsole from "vconsole";
// 全局样式
import "./app.scss";

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});
  // const vConsole = new VConsole();
  // 接下来即可照常使用 `console` 等方法
  console.log("Hello world");

  return props.children;
}

export default App;
