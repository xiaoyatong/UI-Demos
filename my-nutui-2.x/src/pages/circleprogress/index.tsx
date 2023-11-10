import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image as TImage,
  Textarea as TTextArea,
} from "@tarojs/components";
import { Cell, Button, CircleProgress } from "@nutui/nutui-react-taro";
import { useLoad } from "@tarojs/taro";

// import "./index.scss";

function Index() {
  const [list, setList] = useState([{ value: 50 }]);

  useLoad(() => {
    getList();
  });

  const getList = () => {
    setTimeout(() => {
      setList([
        { value: 50 },
        { value: 0 },
        { value: 100 },
        { value: 40 },
        { value: 80 },
        { value: 20 },
      ]);
    }, 100);
  };

  console.log("list", list);

  return (
    <View className="nutui-react-demo">
      <Cell>
        <CircleProgress percent={0} />
      </Cell>
      <Cell style={{ height: "300px" }}>
        {list.map((item, index) => (
          <CircleProgress key={index} percent={item.value}>
            {item.value}%
          </CircleProgress>
        ))}
      </Cell>
      {list.map((item, index) => (
        <CircleProgress key={index} percent={item.value}>
          {item.value}%
        </CircleProgress>
      ))}
    </View>
  );
}

export default Index;
