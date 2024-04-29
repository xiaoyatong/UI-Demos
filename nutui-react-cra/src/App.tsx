import "./App.css";
import React, { useState } from "react";
import { Star } from "@nutui/icons-react";
import {
  Toast,
  Cell,
  Row,
  Col,
  Image,
  Button,
  Tabs,
  Range,
} from "@nutui/nutui-react";

function App() {
  const iconToast = (msg: string) => {
    Toast.show({
      content: msg,
      style: {
        "--nutui-overlay-bg-color": "rgba(0, 0, 0, 0)",
      },
      closeOnOverlayClick: true,
      onClose: () => {
        console.log("closeToast");
      },
    });
  };
  const [tab4value, setTab4value] = useState("0");
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState(10);

  return (
    <div>
      <div className="indexHeader">
        <Cell
          title="Loading状态非透明遮罩"
          onClick={(
            event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
          ) => iconToast("加载状态非透明遮罩")}
        />
        <Image
          className="image"
          src="https://nutui.jd.com/h5/react/2x/demo-2.0.14/logo-red.png"
        ></Image>
        <div className="info">
          <h1>NutUI-React</h1>
          <p>京东风格的轻量级移动端 React 组件库</p>
        </div>
      </div>

      <Row>
        <Col span={1} />
        <Col className="flexCenter" span={22}>
          <Button
            type="primary"
            block
            icon={<Star />}
            onClick={() => {
              window.location.href = "https://github.com/jdf2e/nutui-react";
            }}
          >
            Star1
          </Button>
        </Col>
        <Col span={1} />
      </Row>

      <Cell style={{ marginTop: "100rpx", height: "100px" }}>
        {visible && (
          <Range
            min={0}
            max={100}
            value={value}
            onChange={(v: any) => setValue(v)}
            onEnd={() => setVisible(false)}
          />
        )}
      </Cell>

      <Tabs
        value={tab4value}
        onChange={(value: any) => {
          setTab4value(value);
        }}
      >
        <Tabs.TabPane title="低阶特卖">低阶特卖</Tabs.TabPane>
        <Tabs.TabPane title="上新日">上新日</Tabs.TabPane>
        <Tabs.TabPane title="百亿补贴">百亿补贴</Tabs.TabPane>
        <Tabs.TabPane title="今日聚超值">今日聚超值</Tabs.TabPane>
        <Tabs.TabPane title="真好真便宜">真好真便宜</Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
