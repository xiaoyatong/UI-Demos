import { ZIndex } from '../assets/dict'
import { useState } from 'react'

let zIndex = ZIndex;

/**
 * 获取一个全局唯一的 `zIndex` 值。
 */
export function useZIndex(): { zIndex: number } {
  const [zIndexValue] = useState(() => zIndex++)
  return { zIndex: zIndexValue }
}