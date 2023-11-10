import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Image as TImage,
  PickerView,
  PickerViewColumn,
  Textarea as TTextArea,
  Navigator,
} from "@tarojs/components";

import {
  Cell,
  Button,
  Image,
  Popup,
  ConfigProvider,
  Swipe,
  SearchBar,
  DatePicker,
  Dialog,
  Calendar,
  ImagePreview,
  Popover,
  TextArea,
  Menu,
  VirtualList,
  Uploader,
  Collapse,
  Elevator,
  Range,
  InfiniteLoading,
  Picker,
  CircleProgress,
  Toast,
} from "@nutui/nutui-react-taro";
import { Download, Shop } from "@nutui/icons-react-taro";

import "./index.scss";
import Taro from "@tarojs/taro";

function Index() {
  const src =
    "//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg";
  const [showIcon, setShowIcon] = useState(false);
  const darkTheme = {
    nutuiBrandColor: "green",
    // nutuiPopupCloseIconMargin: '30px',
    nutuiBrandColorEnd: "green",
  };
  const [date1, setDate1] = useState(["2019-12-23", "2019-12-26"]);
  const [isVisible1, setIsVisible1] = useState(false);
  const openSwitch1 = () => {
    setIsVisible1(true);
  };

  console.log(
    "cccc",
    Taro.getSystemInfoSync(),
    Taro.getSystemInfoSync().system.toLocaleLowerCase() === "ios"
  );

  const closeSwitch1 = () => {
    setIsVisible1(false);
  };

  const setChooseValue1 = (param: string) => {
    setDate1([...[param[0][3], param[1][3]]]);
  };

  const images = [
    {
      src: "//fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg",
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png",
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg",
    },
    {
      src: "//m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg",
    },
  ];

  const [showPreview0, setShowPreview0] = useState(false);
  const hideFn0 = () => {
    setShowPreview0(false);
  };
  const showFn0 = () => {
    setShowPreview0(true);
  };

  const [basic, setBasic] = useState(false);
  const itemList = [
    {
      key: "key1",
      name: "option1",
    },
    {
      key: "key2",
      name: "option2",
    },
    {
      key: "key3",
      name: "option3",
    },
  ];
  const chooseHandle = (item: any, index: number) => {
    console.log("选择");
  };

  const columnsList = [
    [
      {
        value: 1,
        text: "南京市",
      },
      {
        value: 2,
        text: "无锡市",
      },
      {
        value: 3,
        text: "海北藏族自治区",
      },
      {
        value: 4,
        text: "北京市",
      },
      {
        value: 5,
        text: "连云港市",
      },
      {
        value: 6,
        text: "石家庄市",
      },
      {
        value: 7,
        text: "扬州市",
      },
      {
        value: 8,
        text: "大庆市",
      },
      {
        value: 9,
        text: "绥化市",
      },
      {
        value: 10,
        text: "潍坊市",
      },
      {
        value: 11,
        text: "徐州市",
      },
      {
        value: 12,
        text: "乌鲁木齐市",
      },
    ],
  ];

  const [value, setValue] = useState("");

  const [options] = useState([
    { text: "全部商品", value: 0 },
    { text: "新款商品", value: 1 },
    { text: "活动商品", value: 2 },
  ]);

  const datas = ["1"];
  const pageSize = 90;
  for (let i = 10; i < pageSize; i++) {
    datas.push(`${i}Item`);
  }

  const [list, setsourceData] = useState(datas);

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "50px",
    fontSize: "14px",
    background: "#fff",
    borderRadius: "10px",
  };

  const itemRender = (data: any, dataIndex: any) => {
    return <div>自定义11</div>;
  };

  const [show8, setShow8] = useState(false);
  const [visible, setVisible] = useState(false);

  const dataList = [
    {
      title: "A",
      list: [
        {
          name: "安徽",
          id: 1,
        },
        {
          name: "安徽",
          id: 2,
        },
        {
          name: "安徽",
          id: 11,
        },
        {
          name: "安徽",
          id: 12,
        },
        {
          name: "安徽",
          id: 13,
        },
      ],
    },
    {
      title: "B",
      list: [
        {
          name: "北京",
          id: 2,
        },
      ],
    },
    {
      title: "G",
      list: [
        {
          name: "广西",
          id: 3,
        },
        {
          name: "广东",
          id: 4,
        },
      ],
    },
    {
      title: "H",
      list: [
        {
          name: "湖南",
          id: 5,
        },
        {
          name: "湖北",
          id: 6,
        },
        {
          name: "河南",
          id: 7,
        },
        {
          name: "湖南",
          id: 51,
        },
        {
          name: "湖北",
          id: 62,
        },
        {
          name: "河南",
          id: 72,
        },
      ],
    },
  ];
  const onItemClick = (key: string, item: any) => {
    console.log(key, JSON.stringify(item));
  };

  const onIndexClick = (key: string) => {
    console.log(key);
  };

  const InfiniteUlStyle = {
    height: "500px",
    width: "100%",
    padding: "0",
    overflowY: "auto",
    overflowX: "hidden",
  };

  const InfiniteLiStyle = {
    marginTop: "10px",
    fontSize: "14px",
    color: "rgba(100, 100, 100, 1)",
    textAlign: "center",
  };

  const [defaultList, setDefaultList] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const loadMore = (done: () => void) => {
    setTimeout(() => {
      const curLen = defaultList.length;
      for (let i = curLen; i < curLen + 10; i++) {
        defaultList.push(`${i}`);
      }
      if (defaultList.length >= 30) {
        setHasMore(false);
      } else {
        setDefaultList([...defaultList]);
      }
      done();
    }, 500);
  };

  const refresh = (done: () => void) => {
    // setTimeout(() => {
    //   Taro.showToast({
    //     title: "刷新成功",
    //     icon: "success",
    //     duration: 2000,
    //   });
    //   done();
    // }, 1000);
  };

  const init = () => {
    for (let i = 0; i < 20; i++) {
      defaultList.push(`${i}`);
    }
    setDefaultList([...defaultList]);
  };
  const [baseDesc, setBaseDesc] = useState("");
  const listData1 = [
    [
      {
        value: 1,
        text: "南京市",
      },
      {
        value: 2,
        text: "无锡市",
      },
      {
        value: 3,
        text: "海北藏族自治区",
      },
      {
        value: 4,
        text: "北京市",
      },
      {
        value: 5,
        text: "连云港市",
      },
      {
        value: 6,
        text: "石家庄市",
      },
      {
        value: 7,
        text: "扬州市",
      },
      {
        value: 8,
        text: "大庆市",
      },
      {
        value: 9,
        text: "绥化市",
      },
      {
        value: 10,
        text: "潍坊市",
      },
      {
        value: 11,
        text: "徐州市",
      },
      {
        value: 12,
        text: "乌鲁木齐市",
      },
    ],
  ];
  const listData2 = [
    // 第一列
    [
      { text: "周一", value: "Monday" },
      { text: "周二", value: "Tuesday" },
      { text: "周三", value: "Wednesday" },
      { text: "周四", value: "Thursday" },
      { text: "周五", value: "Friday" },
    ],
    // 第二列
    [
      { text: "上午", value: "Morning" },
      { text: "下午", value: "Afternoon" },
      { text: "晚上", value: "Evening" },
    ],
  ];
  const [defaultValue, setDefaultValue] = useState([2]);
  const [isVisible2, setIsVisible2] = useState(false);
  // 切换选择项
  const changePicker = (options: any[], values: any, columnIndex: number) => {
    console.log("picker onChange", columnIndex, values, options);
  };
  // 确定选择
  const confirmPicker = (
    type: string,
    options: any[],
    values: (string | number)[]
  ) => {
    console.log("picker选择确定", values, options);
    let description = "";
    options.forEach((option: any) => {
      description += ` ${option.text}`;
    });
    if (type === "base") {
      setBaseDesc(description);
    }
  };

  return (
    <View className="nutui-react-demo">
      <Toast id="test" />
      <Cell
        title="函数调用"
        onClick={(event: React.MouseEvent) => {
          Toast.show("test", {
            title: "函数调用",
            msg: `Let's try ABCDEFGHIJKABCDEFGHIJKLMN here.`,
            type: "fail",
            duration: 3,
            position: "center",
            size: "large",
            lockScroll: true,
            onClose: () => {
              console.log("close");
            },
          });
        }}
      />
      <View className="index">
        欢迎使用 NutUI React 开发 Taro 多端项目。
        <Download />
      </View>
      <Cell>
        <Navigator url="/pages/circleprogress/index">打开CircelDemo</Navigator>
      </Cell>
      <SearchBar placeholder="上京东，购好物" />
      <Button onClick={() => setVisible(true)}> 打开设置</Button>
      <Button
        onClick={() =>
          Taro.chooseMedia({
            count: 9,
            mediaType: ["image", "video"],
            sourceType: ["album", "camera"],
            maxDuration: 30,
            camera: "back",
            success: (res) => {
              console.log(res.tempFiles);
              console.log(res.type);
            },
            fail: (e) => {
              console.log("failed", e);
            },
          })
        }
      >
        {" "}
        使用Taro上传视频
      </Button>
      <Cell
        title="请选择城市"
        description={baseDesc}
        onClick={() => setIsVisible2(!isVisible2)}
      />
      <Picker
        title="请选择城市"
        visible={isVisible1}
        options={listData1}
        defaultValue={defaultValue}
        onConfirm={(list, values) => confirmPicker("base", list, values)}
        onClose={() => setIsVisible1(false)}
        onChange={changePicker}
      />

      <Picker
        visible={isVisible2}
        options={listData2}
        onClose={() => setIsVisible2(false)}
        defaultValue={["Wednesday"]}
        onChange={changePicker}
        onConfirm={(list, values) => confirmPicker("mutil", list, values)}
      />

      <Button onClick={() => setShow8(true)}> 选择日期</Button>

      <Cell>
        <ul id="scrollDemo" style={InfiniteUlStyle}>
          <InfiniteLoading
            pullingText={
              <>
                <span style={{ fontSize: "10px" }}>松开刷新</span>
              </>
            }
            loadingText="加载中···"
            loadMoreText="没有啦～"
            pullRefresh
            target="scrollDemo"
            hasMore={hasMore}
            onLoadMore={loadMore}
            onRefresh={refresh}
          >
            {defaultList.map((item, index) => {
              return (
                <li key={index} style={InfiniteLiStyle}>
                  {item}
                </li>
              );
            })}
          </InfiniteLoading>
        </ul>
      </Cell>

      {/* <Dialog title="设备信息" visible={visible} footer={null}>
        <Button onClick={() => setShow8(true)}> 选择日期</Button>
        <Button onClick={() => setVisible(false)}>关闭dialog</Button>
      </Dialog> */}

      <Cell>
        <Range defaultValue={40} />
      </Cell>

      <Cell>
        <Elevator
          list={dataList}
          height="260"
          onItemClick={(key: string, item: any) => onItemClick(key, item)}
          onIndexClick={(key: string) => onIndexClick(key)}
        />
      </Cell>
      {/* 
      <DatePicker
        title="时分选择"
        type="hour-minutes"
        visible={show8}
        showChinese={true}
        onClose={() => setShow8(false)}
        onConfirm={(options: any, values: any) =>
          console.log("values", values, "options", options)
        }
      /> */}

      <DatePicker
        visible={show8}
        type="datetime"
        value={new Date("2023-11-01")}
        onClose={() => setShow8(false)}
        onConfirm={(_, values) => console.log(values)}
      />

      {/* <NoticeBar
        direction="vertical"
        list={[
        'NoticeBar 公告栏',
        'Cascader 级联选择',
        'DatePicker 日期选择器',
        'CheckBox 复选按钮',
      ]}
        speed={10}
        duration={1000}
        onClick={(e) => {
          // go(e.target.innerHtml)
        }}
        closeable
      /> */}
      <ConfigProvider theme={darkTheme}>
        <Cell>
          {/* <PickerView
            // value={currentValue}
            immediateChange
            // onPickStart={pickerStart}
            // onChange={pickerChange}
            // onPickEnd={pickerEnd}
            className="nut-picker-view-panel"
          >
            {columnsList?.map((columnOptions, index) => {
              return (
                <PickerViewColumn key={`col${index}`}>
                  {columnOptions.map((item, index) => {
                    return (
                      <View
                        key={item.value || index}
                        className="nut-picker-roller-item-title"
                      >
                        <>{item.text || item}1</>
                      </View>
                    )
                  })}
                </PickerViewColumn>
              )
            })}
          </PickerView> */}
        </Cell>

        <Menu>
          <Menu.Item options={options} value={0} columns={2} />
        </Menu>
        <Menu>
          <Menu.Item title="时间"></Menu.Item>
          <Menu.Item title="排序"></Menu.Item>
        </Menu>

        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>
        <Swipe
          rightAction={
            <Button type="primary" shape="square">
              删除
            </Button>
          }
        >
          <Cell title="左滑删除" radius={0} />
        </Swipe>

        <Cell>
          <Uploader
            url="https://mts2h5.jdcloud.com/api/gwf?_code=1000"
            style={{
              marginRight: "10px",
              marginBottom: "10px",
            }}
            onStart={(res: any) => {
              console.log("start", res);
            }}
            onSuccess={(res: any) => {
              console.log(
                "res1111",
                res.files[0],
                res.files[0].thumbTempFilePath
              );
            }}
            uploadLabel="商品主图"
            mediaType={["image", "video"]}
            multiple={true}
            maxCount={10}
            previewUrl=""
          />
          <Uploader uploadLabel="商品主图-视频图片" />
        </Cell>

        <Cell>
          <Collapse className="test" defaultActiveName={["1", "2"]}>
            <Collapse.Item title="我是百搭" name="1">
              我是百搭我是百搭我是百搭我是百搭我是百搭
            </Collapse.Item>
            <Collapse.Item title="我是百搭" name="2">
              我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭
            </Collapse.Item>
            <Collapse.Item title="我是百搭" name="3" disabled>
              我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭我是百搭
            </Collapse.Item>
          </Collapse>
        </Cell>

        <Cell>
          {/* <VirtualList itemHeight={66} list={list} itemRender={itemRender} /> */}
        </Cell>

        <TextArea rows={1} autoSize />
        <TextArea
          value={value}
          autoSize
          onChange={(value: any) => setValue(value)}
        />
        <Cell>
          <TTextArea
            autoHeight
            value={
              "问题描述：Tabs  Tab 项的内容，所以，第二个 Tab 项的内容 InfiniteScroll 是不可见的。但第二个 Tab 添加了 forceRender 属性，所以即使不可见，其内容也会渲染。本次渲染 InfiniteScroll组件时，由于该组件不可见，所以，不会调用"
            }
          ></TTextArea>
        </Cell>

        <Cell>
          <Popover
            visible={basic}
            list={itemList}
            location="bottom-start"
            style={{ marginRight: "30px" }}
            onClick={() => {
              basic ? setBasic(false) : setBasic(true);
            }}
            onOpen={() => {
              console.log("打开菜单时触发");
            }}
            onClose={() => {
              console.log("关闭菜单时触发");
            }}
            onSelect={chooseHandle}
          >
            <Button type="primary" shape="square">
              基础用法
            </Button>
          </Popover>
        </Cell>
        <Cell>
          <Button type="primary" className="btn">
            NutUI React Button2
          </Button>
          <Button shape="square" type="primary" icon={<Shop />}></Button>
        </Cell>
        <Cell>
          <Button
            type="primary"
            className="btn"
            onClick={() => {
              setShowIcon(true);
            }}
          >
            打开 Popup
          </Button>
        </Cell>
        <Popup
          closeable
          visible={showIcon}
          style={{ height: "20%" }}
          position="bottom"
          onClose={() => {
            setShowIcon(false);
          }}
        />

        <Cell>
          <Button type="primary" className="btn" onClick={openSwitch1}>
            打开 日历
          </Button>
        </Cell>
        {/* <Calendar
          visible={isVisible1}
          defaultValue={date1}
          type="range"
          startDate="2019-12-22"
          endDate="2021-01-08"
          onClose={closeSwitch1}
          onConfirm={setChooseValue1}
        /> */}
        <Cell>
          <Button type="primary" className="btn" onClick={showFn0}>
            打开 图片预览
          </Button>
        </Cell>
        <ImagePreview
          // autoPlay
          images={images}
          visible={showPreview0}
          onClose={hideFn0}
        />

        <Cell>
          <Image
            src={
              "//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
            }
          />
        </Cell>
        <TImage
          src={
            "//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
          }
        />
      </ConfigProvider>
    </View>
  );
}

export default Index;
