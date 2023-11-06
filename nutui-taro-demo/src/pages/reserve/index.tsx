import React, { useEffect, useState } from "react";
import { Cell, CellGroup, Icon, Menu, MenuItem, SearchBar, TabPane, Tabs } from "@nutui/nutui-react-taro";
import './index.scss'

function Reserve() {
  // All React Hooks can be used
  useEffect(() => {
  })

  // 初始数据
  const [tabDay, setTabDay] = useState('20230227');

  // 诊所列表
  const menuClinicItems = [
    { text: '全部诊所', value: 0 },
    { text: '科华炯炯', value: 1 },
    { text: '成龙炯炯', value: 2 },
    { text: '龙泉炯炯', value: 3 },
    { text: '温江炯炯', value: 4 },
  ]

  // 专家列表
  const menuExpertItems = [
    { text: '全部专家', value: 0 },
    { text: '蔡立欢', value: 1 },
    { text: '郭云龙', value: 2 },
    { text: '叶珊', value: 3 },
    { text: '李静', value: 4 },
  ]

  // 科目列表
  const menuTreatmentItems = [
    { text: '全部科目', value: 0 },
    { text: '电脑验光', value: 1 },
    { text: '医学验光', value: 2 },
    { text: '干眼诊疗', value: 3 },
  ]

  // 日期列表
  const tabDayItems = [
    {
      title: '今天',
      date: '02/27',
      timestamp: '20230227',
    },
    {
      title: '明天',
      date: '02/28',
      timestamp: '20230228',
    },
    {
      title: '周三',
      date: '03/01',
      timestamp: '20230301',
    },
    {
      title: '周四',
      date: '03/02',
      timestamp: '20230302',
    },
    {
      title: '周五',
      date: '03/03',
      timestamp: '20230303',
    },
    {
      title: '周六',
      date: '03/04',
      timestamp: '20230304',
    },
    {
      title: '周日',
      date: '03/05',
      timestamp: '20230305',
    }
  ]

  // 出诊班表
  const clinicItems = [
    {
      title: '炯炯科华',
      address: '成都武侯区科华中路新3号1栋2层0213号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
    {
      title: '炯炯成龙',
      address: '成都锦江区红豆树街377号4栋1层6号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
    {
      title: '炯炯龙泉',
      address: '成都龙泉驿区大面街道金茶路466号附217号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
    {
      title: '炯炯尚锦',
      address: '成都高新区尚锦路241号1栋1楼108号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
    {
      title: '炯炯中海',
      address: '成都高新区交子大道365号01层附103、104、105号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
    {
      title: '炯炯温江',
      address: '成都市温江区涌泉街办江浦路288号25栋附312号',
      phone: '4008008888',
      icon: '//img10.360buyimg.com/n2/s240x240_jfs/t1/210890/22/4728/163829/6163a590Eb7c6f4b5/6390526d49791cb9.jpg!q70.jpg'
    },
  ]


  // 搜索动作
  const [searchContent, setSearchContent] = useState('')
  const onSearchChange = (val: string, _e: Event) => {
    setSearchContent(val)
    console.log(searchContent)
  }

  return (
    <>
      <Tabs
        titleScroll
        value={tabDay}
        titleNode={() => {
          return tabDayItems.map(item => (
            <div
              key={item.timestamp}
              onClick={() => setTabDay(item.timestamp)}
              className={`nut-tabs__titles-item ${tabDay == item.timestamp ? 'active' : ''}`}
            >
              <div className='nut-tabs__titles-item__text'>
                <span className='main-title'>{item.title}</span>
                <span className='sub-title'>{item.date}</span>
                <div className='nut-tabs__titles-item__line' />
              </div>
            </div>
          ))
        }}
      />


      <SearchBar
        leftinIcon={<Icon name='search' size='14' />}
        onChange={(val: string, e: Event) => onSearchChange(val, e)}
        placeholder='搜索诊所、专家名称'
        shape='round'
      >
        {searchContent}
      </SearchBar>
      <Menu>
        <MenuItem options={menuClinicItems} value={0} />
        <MenuItem options={menuExpertItems} value={0} />
        <MenuItem options={menuTreatmentItems} value={0} />
      </Menu>
      <Tabs
        value={tabDay}
        className='shadow-tabs'
        titleNode={() => {
          return tabDayItems.map((item) => (
            <div key={item.timestamp} />
          ))
        }}
      >
        {tabDayItems.map(item => (
          <TabPane key={item.timestamp} paneKey={item.timestamp}>
            <div className='container'>
              <CellGroup>
                {clinicItems.map((schedule, index) => {
                  return (
                    <Cell
                      center
                      desc={schedule.phone}
                      iconSlot={
                        <img className='clinic-img' src={schedule.icon} alt='' />
                      }
                      key={index}
                      roundRadius='0'
                      title={schedule.title}
                      subTitle={schedule.address}
                      to='/pages/reserve/schedule/index'
                    />
                  )
                })}
              </CellGroup>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default Reserve
