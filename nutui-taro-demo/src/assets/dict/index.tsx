import pszImg from '../images/psz.png'
import cancelImg from '../images/cancel.png'
import finishedImg from '../images/order__finished.png'
import unuseImg from '../images/unuse.png'
import hasuseImg from '../images/hasuse.png'
import returnImg from '../images/return.png'

const isInWeapp = process.env.TARO_ENV === 'weapp'
export const cdnUrl = 'https://img20.360buyimg.com/cms/'
export const appId = isInWeapp ? 'wx5a686db3cd9dd459' : 'jdae73ac604b6f4339'
export const GLOBAL_CDN_URL = 'https://m.360buyimg.com/n1/'
export const type = 'activity_active'
export const placeImage =
  'https://img30.360buyimg.com/whfe/jfs/t23998/57/1067328023/1605/f7e4af46/5b4ed67aN7ca6653b.png'

export const WX_APPID = isInWeapp ? 'wx5a686db3cd9dd459' : 'jdae73ac604b6f4339'

export const Municipality = ['北京', '上海', '天津', '重庆']

export const sourceTool = isInWeapp ? 1 : 2

/**
 * 支付方式:
 * 在线支付 | 对公转账 | 货到付款 | 现金刷卡
 */
export const PAY_TYPE = {
  dgzz: '对公转账',
  hdfk: '货到付款',
  xjsk: '现金刷卡',
  zxzf: '在线支付'
}

export const ORDER_STATUS_ICON_MAP = {
  配送中: pszImg,
  未支付: pszImg,
  待支付: pszImg,
  等待付款: pszImg,
  出库中: pszImg,
  处理中: pszImg,
  等待提货: pszImg,
  已完成: finishedImg,
  已自提: finishedImg,
  已取消: cancelImg,
  取消中: cancelImg,
  全部退款: cancelImg,
  待提货: pszImg,
  已支付: unuseImg,
  未使用: unuseImg,
  已使用: hasuseImg,
  退款中: returnImg
}

export const EMPTY_IMGLIST = {
  G1: `https://img20.360buyimg.com/ling/jfs/t1/51911/17/14141/31093/5db295e0Ee9ded3a7/032ab270b07d7083.png`
}

export const CANCEL_ORDER_TIPS = [
  '1.限时特价、预约资格等购买优惠可能一并取消',
  '2.如遇订单拆分，京券将换成同价值京豆返还',
  '3.支付券不予返还；支付优惠一并取消',
  '4.订单一旦取消，无法恢复'
]

export const IMAGE_MAP = {
  noStoreImage: `https://img30.360buyimg.com/whfe/jfs/t23080/350/1073870342/1657/159b673e/5b4ed67aN8f749b2f.png`,
  preBuyImage: `https://img30.360buyimg.com/ling/jfs/t1/96585/31/13836/5734/5e5dd224Ece77c207/c12adde6f2793304.png`,
  defaultImage: `https://static.360buyimg.com/fe-design/superstore/images/common/dog.png`,
  noSellImage: `https://storage.360buyimg.com/dlxt/super-store/assets/imgs/not-sell.png`,
  cancelImage: `https://img30.360buyimg.com/whfe/jfs/t19939/227/2667004233/246/a7138695/5b4ed67aN6eb8adad.png`
}
// 预约Code提示码
export const RESERVE_RESULT_CODE = {
  '-1': ['抱歉，预约失败！', ''],
  2: ['活动已结束！', '感谢您的到店支持，欢迎参加其他活动'],
  3: ['您已预约过此活动！', '感谢您的到店支持，欢迎参加其他活动'],
  5: ['活动未开始！', '感谢您的到店支持，欢迎参加其他活动'],
  6: ['活动不存在！', '感谢您的到店支持，欢迎参加其他活动'],
  7: ['活动已约满！', '感谢您的到店支持，欢迎参加其他活动'],
  8: ['该活动为PLUS会员专享活动，欢迎您参加其他活动！', ''],
  9: ['活动预约已结束！', '感谢您的到店支持，欢迎参加其他活动'],
  10: ['活动已结束！', '感谢您的到店支持，欢迎参加其他活动'],
  14: ['活动已暂停', '感谢您的到店支持，欢迎参加其他活动'],
  23: ['抱歉，预约失败！', '您选的赠品已经抢光啦，去看看其他赠品吧'],
  24: ['活动未开始', '感谢您的到店支持，欢迎参加其他活动']
}

export const GIFT_TYPE_STR = ['', '赠品', '赠品', '附件', '加价购'] //0主商品   1赠品 2赠品 3附件   4加价购

export const ZIndex = 99999

// 新老路径映射
export const PATH_CONF = isInWeapp
  ? {
    'pages/index/index': '/container/home/index', // 首页
    'pages/detail/detail': '/container/goodsDetail/index', // 商详
    'pages/proxy/union/union': '/pages/proxy/union/union', // H5小程序码
    'goods/pages/goodGoods/goodGoods': '/container/goodsRecommand/index', // 好物推荐
    'my/pages/serviceEvaluation/serviceEvaluation':
      '/my/pages/serviceEvaluation/serviceEvaluation', // 服务评价推送
    'my/pages/serviceEvaluation/serviceEvaluation2':
      '/my/pages/serviceEvaluation/serviceEvaluation2', // 服务评价推送
    'my/pages/coupon-center/coupon-center': '/container/coupon/index', // 领券中心
    'my/pages/shangpin/activity-info/activity-info':
      '/container/reserve/shangpin/info/index', // 商品预约活动
    'my/pages/subscribe-store/subscribe-store':
      '/container/reserve/store/add/index', // 门店预约活动
    'shop/pages/shop-old2new/index/index': '/container/trade-in/old/index', // 依旧换新
    'my/pages/reserve/courseList/courseList':
      '/container/reserve/store/activity/index', // 活动列表
    'my/pages/shareCoupon/shareCoupon': '/container/share-coupon/index',
    'my/pages/yucun/yucun-index/yucun-index': '/container/preStore/index',
    'my/pages/grant-auth/grant-auth': '/container/grantAuth/index',
    'pay/pages/pay/pay/pay': '/container/pay/index',
    'pages/order/order-code/order-code': '/container/order/orderPickup/index'
  }
  : {
    'pages/index/index': '/container/home/index', // 首页
    'pages/detail/detail': '/container/goodsDetail/index', // 商详
    'goods/pages/goodGoods/goodGoods': '/container/goosRecommand/index', // 活动小程序码
    'my/pages/coupon-center/coupon-center': '/container/coupon/index', // 领券中心
    'my/pages/shangpin/activity-info/activity-info':
      '/container/reserve/shangpin/info/index', // 商品预约活动
    'my/pages/subscribe-store/subscribe-store':
      '/container/reserve/store/add/index', // 门店预约活动
    'shop/pages/shop-old2new/index/index': '/container/trade-in/old/index', // 依旧换新
    'my/pages/reserve/courseList/courseList':
      '/container/reserve/store/activity/index', // 活动列表
    'my/pages/shareCoupon/shareCoupon': '/container/share-coupon/index',
    'my/pages/yucun/yucun-index/yucun-index': '/container/preStore/index',
    'my/pages/grant-auth/grant-auth': '/container/grantAuth/index',
    'pay/pages/pay/pay/pay': '/container/pay/index',
    'pages/order/order-code/order-code': '/container/order/orderPickup/index',
    'pages/goods-sub/goods-sub': '/container/singlePro/index' //单品引流预约导购
  }
