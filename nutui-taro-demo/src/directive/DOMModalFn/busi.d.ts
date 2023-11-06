interface IBasicModalModal {
  content?: React.ReactChild | React.ReactNode | string;
  className?: string;
  isShowCloseIcon?: boolean;
  hiddenBtn?: boolean;
  headerTxt?: React.ReactChild | React.ReactNode | string;
  subTitle?: React.ReactChild | React.ReactNode | string;
  confirmTxt?: string;
  cancelTxt?: string;
  confirmFunc?: Function;
  cancelFunc?: Function;
  isDOMDirective?: boolean; // 是否为DOMDirective 调用方式
  zIndex?: number; // 层级
}

interface ICommonModalDataProps extends IBasicModalModal {
  [name: string]: any;
}

interface ICommonModalProps {
  visible: boolean;
  data?: ICommonModalDataProps;
  type?: string; // 弹窗类型 基础
  className?: string;
}