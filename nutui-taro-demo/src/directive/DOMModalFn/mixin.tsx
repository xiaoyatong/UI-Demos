import { Block, CustomWrapper } from '@tarojs/components'
import { memo } from 'react'
import { useStore } from './state'
import DOMConfig from './config'

const ModalWrapper = memo(() => {
  const [modalConfig] = useStore('modal', DOMConfig.config)
  return (
    <Block>
      {modalConfig.map((c, idx) => {
        return <c.component key={idx} {...c} />
      })}
    </Block>
  )
})

export const MPopup = memo(() => {
  const [popupConfig] = useStore('mpopup', DOMConfig.mpopConfig)
  return (
    <CustomWrapper>
      <Block>
        {popupConfig?.map((c) => {
          return (
            <c.component key={c.key} {...c}>
              {c.title}
              {c.content}
            </c.component>
          )
        })}
      </Block>
    </CustomWrapper>
  )
})

export const MLoading = memo(() => {
  const [mloadingConfig] = useStore('mloading', DOMConfig.mloadingConfig)
  return (
    <Block>
      {mloadingConfig.map((c) => {
        return <c.component key={c.key} {...c}></c.component>
      })}
    </Block>
  )
})

export default ModalWrapper
