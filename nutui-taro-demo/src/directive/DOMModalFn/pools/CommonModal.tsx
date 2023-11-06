import { Image, View } from '@tarojs/components';
import { useMemo } from 'react';
import Directive from '../../../directive';
import '../index.scss';

const closeIcon = `https://img30.360buyimg.com/whfe/jfs/t21484/104/2308629773/5213/df1f60b9/5b4eead0N3a45f497.png`;

const BasicModal = (props: IBasicModalModal) => {
  const {
    content, className = '', isShowCloseIcon = true,
    hiddenBtn = true, headerTxt, subTitle,
    cancelFunc, confirmFunc, cancelTxt, confirmTxt,
    isDOMDirective = true, zIndex
  } = props;
  return (
    <View className={`common-modal ${className}`}
      onTouchMove={e => e.preventDefault()}
      catchMove
      style={{ zIndex }}
    >
      <View className='common-modal__mask'></View>
      <View className={`common-modal__container ${!hiddenBtn ? 'paddbottom' : ''}`}>
        {headerTxt && <View className='common-modal__container--header'>{headerTxt}</View>}
        {subTitle && <View className='common-modal__container--subTitle'>{subTitle}</View>}
        <View className='common-modal__container--content'>
          {content}
        </View>
        {
          !hiddenBtn && (
            <View className={`common-modal__container--footer ${cancelTxt && confirmTxt ? 'two-btn' : ''}`}>
              {cancelTxt && <View className='common-modal--btn btn__cancel' onClick={(evt) => {
                isDOMDirective && Directive.DOMModalFn.changeCommonModal({ visible: false })
                cancelFunc && cancelFunc(evt);
              }}
              >{cancelTxt}</View>}

              {confirmTxt && <View className='common-modal--btn btn__confirm' onClick={(evt) => {
                isDOMDirective && Directive.DOMModalFn.changeCommonModal({ visible: false })
                confirmFunc && confirmFunc(evt);
              }}
              >{confirmTxt}</View>}
            </View>
          )
        }
        {isShowCloseIcon && (
          <Image className='common-modal__container--close' src={closeIcon} onClick={(evt) => {
            cancelFunc && cancelFunc(evt);
            Directive.DOMModalFn.changeCommonModal({ visible: false });
          }}
          />
        )}
      </View>
    </View>
  )
}

const CommonModal = ({ data, visible, type = 'basic', className = '' }: ICommonModalProps) => {

  const RenderModal = useMemo(() => {
    switch (type) {
      case 'basic':
      default:
        return BasicModal;
    }
  }, [type]);

  // @ts-ignore
  return visible ? <RenderModal {...data} /> : <></>;
}

export default CommonModal;
