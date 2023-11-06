// import { reject } from 'lodash'
import { mutate } from './state'

const DOMModalFn = {
  changeCommonModal: ({
    visible,
    data,
    type,
    className
  }: ICommonModalProps) => {
    // console.log('%c [ data ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    mutate('modal', (config) => {
      const commonConfig = config.find(({ name }) => name === 'common')
      commonConfig.visible = visible
      commonConfig.data = data
      commonConfig.type = type
      return [...config]
    })
  },
  changeCommonPopup: ({
    content,
    title,
    className,
    onVisibleChange = () => void 0,
    maskClosable,
    key,
    isShowPopup,
    duration
  }: any) => {
    mutate('mpopup', (config) => {
      const commonConfig = config?.find(({ name }) => name === 'mpopup') || {}
      commonConfig.visible = isShowPopup
      commonConfig.duration = duration
      commonConfig.onVisibleChange = onVisibleChange
      // 隐藏Popup时，不对title，content涉及渲染内容重置，否则会造成内容消息，遮罩层缓慢消失顿挫的视觉差
      if (isShowPopup) {
        if (!content) {
          return [...config]
        }
        commonConfig.key = key ? key : Math.floor(Math.random() * 1000)
        commonConfig.content = content
        commonConfig.title = title
        commonConfig.maskClosable = maskClosable
        commonConfig.className = className
        commonConfig.position = 'bottom'
      }
      return config ? [...config] : []
    })
  },
  showLoading: () => {
    return new Promise((resolve, reject) => {
      mutate('mloading', (config) => {
        const commonConfig = config.find(({ name }) => name === 'mloading')
        commonConfig.visible = true
        return [...config]
      })
      resolve({})
    }).catch((error) => {
      console.log(error)
    })
  },
  hideLoading: () => {
    mutate('mloading', (config) => {
      const commonConfig = config.find(({ name }) => name === 'mloading')
      commonConfig.visible = false
      return [...config]
    })
  }
}
// 测试loading

export default DOMModalFn
