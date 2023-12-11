import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import {
  AnimatingNumbers,
  Cell,
  ConfigProvider,
} from "@nutui/nutui-react-taro";
import { useTranslate } from "../../../../assets/locale/taro";
import Header from "../../../../assets/components/header";

interface T {
  basic: string;
  custom: string;
}
const AnimatingNumbersDemo = () => {
  const [translated] = useTranslate<T>({
    "zh-CN": {
      basic: "基础用法",
      custom: "自定义样式，动态修改数据（需要指定最大位数）",
    },
    "zh-TW": {
      basic: "基础用法",
      custom: "自定義樣式，動態修改數據（需要指定最大位數）",
    },
    "en-US": {
      basic: "Basic Usage",
      custom:
        "Custom styles to dynamically modify data (maximum number of bits required)",
    },
  });
  const customTheme = {
    nutuiCountupWidth: "24px",
    nutuiCountupBgColor: `var(--nutui-color-primary)`,
    nutuiCountupColor: `#fff`,
    nutuiCountupLrMargin: `1px`,
  };
  const [value, setEndNumer] = useState("1570.99");
  useEffect(() => {
    const timer = setInterval(() => {
      setEndNumer(
        `${Math.floor(Math.random() * 999999)}.${Math.floor(
          Math.random() * 89 + 10
        )}`
      );
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Header />
      <div className={`demo ${Taro.getEnv() === "WEB" ? "web" : ""}`}>
        <h2>CountUp-{translated.basic}</h2>
        <Cell title={<AnimatingNumbers.CountUp value="678.94" />} />
        <h2>CountUp-{translated.custom}</h2>
        <Cell
          title={
            <ConfigProvider theme={customTheme}>
              <AnimatingNumbers.CountUp
                value={value}
                duration={1.2}
                length={6}
              />
            </ConfigProvider>
          }
        />
      </div>
    </>
  );
};

export default AnimatingNumbersDemo;
