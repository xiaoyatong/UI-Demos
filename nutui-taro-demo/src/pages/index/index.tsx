import React, { useState, useRef } from 'react'

import './index.scss'
import { Button, NavBar, Icon, Overlay, Ellipsis, NumberKeyboard, Popover, Popup, Uploader, Cell, Calendar, Form, Input, TextArea, DatePicker, Steps, Step } from '@nutui/nutui-react-taro';
import { View } from "@tarojs/components";


const Index = () => {
  const [visible, setVisible] = useState(false)
  const [visible1, SetVisible1] = useState(false)
  const currentKey = 0

  const [showBottom, setShowBottom] = useState(false)
  const [data] = useState(new Array(1000).join('10').split(''))
  console.log('data', data)


  const [visible3, setVisible3] = useState(false)
  const handleToggleShow = () => {
    setVisible3(true)
  }
  const onClose = () => {
    setVisible3(false)
  }

  const [show1, setShow1] = useState(false)
  const [desc1, setDesc1] = useState('2012年 01月 01日')
  const confirm1 = (values: (string | number)[], options: PickerOption[]) => {
    setDesc1(options.map((option) => option.text).join(' '))
  }

  const [lightTheme, setLightTheme] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)
  const itemList = [
    { name: 'option1' },
    { name: 'option2' },
    { name: 'option3' },
  ]

  const dates = [
    {
      'pannel-key': '0',
      date: '5月20日(今天)'
    },
    {
      'pannel-key': '1',
      date: '5月21日(星期三)',
    },
  ]
  const times = [
    {
      key: '0',
      list: ['9:00-10:00', '10:00-11:00', '11:00-12:00'],
    },
    {
      key: '1',
      list: ['9:00-10:00', '10:00-11:00'],
    },
  ]

  const handleClick = () => {
    SetVisible1(true)
  }
  const handleSelect = (selectTimeData) => {
    SetVisible1(false)
    // Toast.text(`您选择了: ${JSON.stringify(selectTimeData)}`)
  }
  const handlePannelChange = (pannelKey, selectTimeData) => {
    console.log('pannelKey, selectTimeData: ', pannelKey, selectTimeData)
  }
  const handleTimeChange = (time, selectTimeData) => {
    console.log('time, selectTimeData: ', time, selectTimeData)
  }


  const uploadUrl = 'https://my-json-server.typicode.com/linrufeng/demo/posts'
  const defaultFileList = [
    {
      name: '文件1.png',
      url: 'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif',
      status: 'success',
      message: '上传成功',
      type: 'image',
      uid: '123',
    },
  ]

  const Utils = {
    date2Str(date: Date, split?: string): string {
      split = split || '-'
      const y = date.getFullYear()
      const m = this.getNumTwoBit(date.getMonth() + 1)
      const d = this.getNumTwoBit(date.getDate())
      return [y, m, d].join(split)
    },
    getDay(i: number): string {
      i = i || 0
      let date = new Date()
      const diff = i * (1000 * 60 * 60 * 24)
      date = new Date(date.getTime() + diff)
      return this.date2Str(date)
    },
    getNumTwoBit(n: number): string {
      n = Number(n)
      return (n > 9 ? '' : '0') + n
    },
    getMonthDays(year: string, month: string): number {
      if (/^0/.test(month)) {
        month = month.split('')[1]
      }
      return (
        [
          0,
          31,
          this.isLeapYear(Number(year)) ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ] as number[]
      )[month as any]
    },
    isLeapYear(y: number): boolean {
      return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0
    },
  };

  const [date3, setDate3] = useState('')
  const [isVisible3, setIsVisible3] = useState(false)
  const calendarRef = useRef<any>(null);

  const openSwitch3 = () => {
    setIsVisible3(true)
  }

  const closeSwitch3 = () => {
    setIsVisible3(false)
  }

  // const setChooseValue3 = (param: string) => {
  //   setDate3([...[param[0][3], param[1][3]]])
  // }

  const goDate = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollToDate('2022-04-01');
    }
  };

  // const clickBtn = () => {
  //   const date = [Utils.date2Str(new Date()), Utils.getDay(6)];
  //   setDate3(date);
  // }

  // const clickBtn1 = () => {
  //   const date = new Date();
  //   const year = date.getFullYear();
  //   let month: any = date.getMonth() + 1;
  //   month = month < 10 ? `0${month}` : `${month}`;
  //   const yearMonth = `${year}-${month}`;
  //   const currMonthDays = Utils.getMonthDays(`${year}`, `${month}`);
  //   setDate3([`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`]);
  // }

  const onBtn = () => {
    return (
      <div className="wrapper" style={{ display: 'flex', padding: '0 40px' }}>
        <div className="d_div" style={{ margin: '0px 5px' }}>
          <span className="d_btn" onClick={goDate} style={{ background: '#fa3f19', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', height: '20px' }}>去某个月</span>
        </div>
        <div className="d_div" style={{ margin: '0px 5px' }}>
          <span className="d_btn" style={{ background: '#fa3f19', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', height: '20px' }}>最近七天</span>
        </div>
        <div className="d_div" style={{ margin: '0px 5px' }}>
          <span className="d_btn" style={{ background: '#fa3f19', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', height: '20px' }}>当月</span>
        </div>
      </div>
    )
  }

  const minDate = new Date(2023, 0, 1)
  const [showActStartTime, setShowActStartTime] = useState(false)

  const [currentStep, setCurrentStep] = useState(2)


  return (
    <div className="nutui-react-demo">
      <div className="index">
        欢迎使用 NutUI React 开发 Taro 多端项目。
      </div>

      <Button type="primary" onClick={handleToggleShow}>
        显示遮罩层
      </Button>
      <Overlay visible={visible3} onClick={onClose} >
        asdasdasdasdasd
      </Overlay>

      <Steps current={currentStep} progressDot>
        <Step activeIndex={1} title='步骤一'>1</Step>
        <Step activeIndex={2} title='步骤二'>2</Step>
        <Step activeIndex={3} title='步骤三'>3</Step>
        <Step activeIndex={4} title='步骤四'>4</Step>
        <Step activeIndex={5} title='步骤⑤'>5</Step>
      </Steps>

      <Cell
        title={'打开popup'}
        isLink
        onClick={() => {
          setShowBottom(true)
        }}
      />

      <Popup
        visible={showBottom}
        style={{ height: '40%' }}
        position="bottom"
        onClose={() => {
          setShowBottom(false)
        }}
      >
        {data.map((item) => {
          return <div key={item}>点点积极的做好</div>
        })}
      </Popup>

      {/* <View>
        <View>
          <View>
            <View>
              <View>
                <View>
                  <View>
                    <View>
                      <View>
                        <View>
                          <View>
                            <View>
                                <View>
                                    <View>
                                        <Ellipsis
                                            content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。"
                                            direction="end"
                                            expandText="展开"
                                            collapseText="收起"
                                        />
                                    </View>
                                </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View> */}

      <Cell>
        <Ellipsis
          content="超市那就看下那颗心能卡技术新安县阿克苏基尼系数西安上学那"
          direction="start"
        />
      </Cell>
      <Cell>
        <Ellipsis
          content="超市那就看下那颗心能卡技术新安县阿克苏基尼系数西安上学那"
          direction="start"
        />
      </Cell>

      {/* 
      <Ellipsis
        content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。"
        direction="end"
        expandText="展开"
        collapseText="收起"
      />

      <Button type="primary" className="btn" onClick={() => setVisible(true)}>
        NutUI React Button
      </Button> */}
      {/* <div className="index">
        <Button type="primary" className="btn">
          NutUI React Button
        </Button>
      </div>
      <NoticeBar text={'NutUI 是京东风格的移是京东风格的移是京东风格的移是京东风格的移是京东风格的移动端组件库'} />

      <Cell title="请选择配送时间" onClick={handleClick} />
      <TimeSelect
        visible={visible1}
        height="50%"
        title="取件时间 1"
        multiple
        currentKey={currentKey}
        dates={dates}
        times={times}
        onSelect={handleSelect}
        onPannelChange={handlePannelChange}
        onTimeChange={handleTimeChange}
      />*/}


      {/* <Form>
        <Form.Item label='姓名' name="username">
          <Input
            className="nut-input-text"
            placeholder='请输入姓名'
            type="text"
          />
        </Form.Item>
        <Form.Item label='备注' name="remark">
          <TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>  */}

      <NavBar
        title="订单详情"
        leftShow
        leftText="返回"
        onClickTitle={(e) => alert("标题")}
        onClickBack={(e) => alert("返回")}
        onClickRight={(e) => alert('icon')}
      >
        {/* <Icon name="share" slot="right" /> */}
      </NavBar>

      <NumberKeyboard
        visible={visible}
        onClose={() => setVisible(false)}
      />

      <Popover
        visible={lightTheme}
        onClick={() => { lightTheme ? setLightTheme(false) : setLightTheme(true) }}
        list={itemList}>
        <Button type="primary" shape="square">明朗风格</Button>
      </Popover>

      <Uploader url={uploadUrl}>
        <Button type="success" size="small">
          上传文件
        </Button>
      </Uploader>


      <Cell title="选择日期" desc={date3 ? `${date3[0]}至${date3[1]}` : '请选择'} onClick={openSwitch3} />
      <Calendar
        ref={calendarRef}
        visible={isVisible3}
        defaultValue={date3}
        type="range"
        startDate="2021-12-22"
        endDate="2022-12-31"
        onBtn={onBtn}
        onClose={closeSwitch3}
      // onChoose={setChooseValue3}
      />

      <Cell title="显示中文" desc={desc1} onClick={() => setShow1(true)} />
      <DatePicker
        title="日期选择"
        visible={show1}
        isShowChinese
        onCloseDatePicker={() => setShow1(false)}
        onConfirmDatePicker={(values, options) => confirm1(values, options)}
      />
      <Cell title='实际' onClick={() => setShowActStartTime(true)} />
      <DatePicker
        title='时间选择'
        type='datetime'
        minDate={minDate}
        visible={showActStartTime}
        onCloseDatePicker={() => setShowActStartTime(false)}
      // onConfirmDatePicker={(values,options) => confirmActStartTime(values,options)}
      />



    </div>
  );
}
export default Index
