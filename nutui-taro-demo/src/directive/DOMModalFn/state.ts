import { isEmpty } from 'lodash';
import { useState } from 'react';

export const stores: Array<{
  key: string;
  value: any;
  cbs: Array<Function>;
}> = []

// 外部修改 hook 状态
export function mutate(key, value) {
  const cacheIdx = stores.findIndex(store => store.key === key)
  // console.log('%c [ stores, cacheIdx, stores[cacheIdx] ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', stores, cacheIdx, stores[cacheIdx])
  if (isEmpty(stores[cacheIdx])) return;
  stores[cacheIdx].cbs.forEach(cb => cb(value))
}

// 外部获取 hooks 状态
export function getState(key) {
  const cacheIdx = stores.findIndex(store => store.key === key)
  return stores[cacheIdx].value
}

export function useStore(key, initValue?: any) {
  // console.log('%c [ stores, key, initValue ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', stores, key, initValue)
  // const cache = useMemo(() => stores.find(store => {

  // }), [key, stores]);
  const cache = stores.find(store => store.key === key);
  // console.log('%c [ cache ]-30', 'font-size:13px; background:pink; color:#bf2c9f;', cache, cache?.cbs)
  // 对于一个相同 key 的 useState, 首先尝试使用缓存数据初始化
  const [state, setState] = useState(cache?.value || initValue)

  // 防止同一个 setState 被缓存多次
  // console.log('%c [ cache?.cbs.find(cb => cb === setState) ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', cache?.cbs.find(cb => {
  //   // cb === setState
  //   console.log('%c [ cb === setState ]-37', 'font-size:13px; background:pink; color:#bf2c9f;', cb === setState)
  //   return cb === setState
  // }), cache?.cbs, )
  try {
    if (!cache) {
      // 对于同名的 key, value应当是相同的，需要将每一个修改状态的函数保存
      stores.push({ key, value: state, cbs: [setState] })
    } else {
      let isExist = !cache?.cbs.find(cb => {
        // console.log('%c [ cb === setState ]-42', 'font-size:13px; background:pink; color:#bf2c9f;', cb === setState)
        return cb === setState
      });

      if (isExist) cache.cbs && cache.cbs.push(setState)
    }
  } catch (err) {
    console.log('%c [ err ]-54', 'font-size:13px; background:pink; color:#bf2c9f;', err)
  }


  /**
   * 小程序当前路由栈未展示时需要删除弹窗实例，这一点需要在所在页面处理，这里无法处理
   * *** 卸载 ***
   * === 组件或页面 ===
   */
  // useEffect(() => {
  //   return () => {
  //     const cacheIdx = stores.findIndex(store => store.key === key)
  //     console.log('%c [ cacheIdx ]-65', 'font-size:13px; background:pink; color:#bf2c9f;', cacheIdx)
  //     const idx = stores[cacheIdx]!.cbs.findIndex(cb => cb === setState)
  //     console.log('%c [ idx ]-67', 'font-size:13px; background:pink; color:#bf2c9f;', idx, cache!.cbs, cache)
  //     cache!.cbs.splice(idx, 1)
  //     if (!cache?.cbs.length) {
  //       stores.splice(cacheIdx, 1)
  //     }
  //   }
  // }, [cache, key, setState])
  return [
    state,
    function (value) {
      let newValue = value
      if (typeof value === 'function') {
        newValue = value(state)
      }
      const _cache = stores.find(store => store.key === key)!
      _cache.value = newValue
      _cache.cbs.forEach(cb => cb(value))
    }
  ]
}
