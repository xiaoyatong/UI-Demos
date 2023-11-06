// import { View, Image, CustomWrapper } from '@tarojs/components'
import { View, Image } from '@tarojs/components'
import { useState, useEffect, memo } from 'react'
import { functionalComponent } from '../component'
import { MPopupDefaultProps, MPopupProps } from './props'
import { NoticeBar } from '@nutui/nutui-react-taro';

import './index.scss'


const MPopup = (props: MPopupProps) => {

  return (
    <View
      className={`m-popup m-popup_bottom`}
    >
      <View className='m-popup__wrapper'>
        {<View className={props.className}>
          <NoticeBar text={'NutUI 是京东风格的移是京东风格的移是京东风格的移是京东风格的移是京东风格的移动端组件库'} />
        </View>}
      </View>
    </View>
  )
}

// @ts-ignore
export default memo(functionalComponent(MPopupDefaultProps)(MPopup))
