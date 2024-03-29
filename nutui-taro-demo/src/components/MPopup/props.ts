import { noop } from 'vtils'
import { createProps, RequiredProp } from '../component'
import { MTransitionProps } from '../Transition'

export type TransitionName = MTransitionProps['name']
export type Position = 'center' | 'top' | 'bottom' | 'right' | 'left'

export const MPopupDefaultProps = createProps({
	/**
	 * 弹出层是否可见。
	 */
	visible: false as any as RequiredProp<boolean>,

	/**
	 * 是否无遮罩。
	 *
	 * @default false
	 */
	noMask: false as boolean,

	/**
	 * 点击遮罩是否可关闭。
	 *
	 * @default false
	 */
	maskClosable: false as boolean,

	/**
	 * 是否显示关闭按钮
	 *
	 * @default false
	 */

	showCloseButton: false as boolean,

	/**
	 * 动画时长，单位：毫秒。
	 *
	 * @default 300
	 */
	duration: 50 as number,

	/**
	 * 弹出内容位置。可以是：
	 *
	 * - `center`: 中间
	 * - `top`: 顶部
	 * - `bottom`: 底部
	 * - `right`: 右侧
	 * - `left`: 左侧
	 *
	 * @default 'center'
	 */
	position: 'center' as Position,

	/**
	 * 动画过渡默认是根据 `position` 决定的，
	 * 你可以使用 `customTransition` 覆盖默认值。
	 */
	customTransition: '' as TransitionName,

	/**
	 * 可见性变化事件。
	 */
	onVisibleChange: noop as any as RequiredProp<(visible: boolean) => void>
})

export type MPopupProps = typeof MPopupDefaultProps
