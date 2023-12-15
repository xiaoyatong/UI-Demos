本项目最开始为 2.2.0 版本。
现升级到 2.3.0 版本，遇到的问题，以及修复方式：

步骤 1. 修改版本号，nutui-react-taro 改为 2.3.0，icon 改为 0.0.5，直接 pnpm i。

> 删除 lock 文件，和 node modules，安装 pnpm i。

步骤 2. 运行命令 `pnpm run dev:weapp`

报错 1：
⚠️ Warnings:

    at HarmonyImportSpecifierDependency.getLinkingErrors (/Users/tongen/Documents/开源/UI-Demos/my-nutui-2.x/node_modules/.pnpm/webpack@5.89.0_@swc+core@1.3.23/node_modules/webpack/lib/dependencies/HarmonyImportDependency.js:163:8)
    ModuleDependencyWarning: export 'Left' (imported as 'Left') was not found in '@nutui/icons-react-taro'

主要是因为 icon 引起。在新的 icon 库中，部分名称进行了变更，使名称更规范化。

| 2.2.0       | 2.3.0         | 描述     |
| ----------- | ------------- | -------- |
| Add         | UserAdd       | 添加用户 |
| Addfollow   | FollowAdd     | 收藏     |
| ArrowDown2  | ArrowDown     | 下箭头   |
| ArrowUp2    | ArrowUp       | 上箭头   |
| ArrowRight2 | ArrowRight    | 右箭头   |
| Ask2        | Ask           | 问号提示 |
| Cart2       | Cart          | 购物车   |
| CircleClose | Close         | 关闭     |
| CloseLittle | Close         | 关闭     |
| Del2        | Del           | 删除     |
| DouArrowUp  | DoubleArrowUp | 双上箭头 |
| DownArrow   | ArrowDown     | 下箭头   |
| Download    | Download2     | 下载     |
| Dshop       | Shop          | 店铺     |
| HeartFillN  | HeartFill     | 实心心形 |
| HeartFill1  | HeartFill     | 实心心形 |
| HeartFill2  | Heart         | 心形     |
| HeartFill3  | HeartFill     | 实心心形 |
| HeartN      | Heart         | 心形     |
| Heart1      | Heart         | 心形     |
| Heart2      | Heart         | 心形     |
| HorizontalN | Horizontal    | 水平对齐 |
| Issue       | Tips          | 提示     |
| Jimi40      | Jimi          | jimi     |
| Left        | ArrowLeft     | 左箭头   |
| Location2   | Location      | 定位     |
| Locationg3  | Location      | 定位     |
| Mores       | More          | 更多     |
| MoreX       | More          | 更多     |
| My          | User          | 头像     |
| My2         | User          | 头像     |
| RectDown    | ArrowDown     | 下箭头   |
| RectLeft    | ArrowLeft     | 做箭头   |
| RectRight   | ArrowRight    | 右箭头   |
| RectUp      | ArrowUp       | 上箭头   |
| Refresh2    | Refresh       | 刷新     |
| Right       | ArrowRight    | 右箭头   |
| SFollow     | Follow        | 心形     |
| Scan        | QrCode        | 二维码   |
| Scan2       | Scan          | 扫描     |
| Search2     | Search        | 放大镜   |
| ShareN      | Share         | 分享     |
| Share1      | Share         | 分享     |
| Shop3       | Shop          | 店铺     |
| StarFillN   | StarFill      | 实心星星 |
| StarFill1   | StarFill      | 实心星星 |
| StarFill2   | StarFill      | 实心星星 |
| StarN       | Star          | 星星     |
| Star1       | Star          | 星星     |
| Star11      | Star          | 星星     |
| Star2       | Star          | 星星     |
| Uploader    | Add           | 添加     |

报错 2. 修复报错 1 问题后，重新 `pnpm run dev:weapp`，报错：

```
SassError: SassError: Undefined variable.
```

这是因为 CSS 变量做了规范，对应如下：

| 2.2.0          | 2.3.0               | 描述                                                                     |
| -------------- | ------------------- | ------------------------------------------------------------------------ |
| $primary-color | $color-primary      | 主色调，主按钮背景色、边框色、镂空文字色                                 |
| $disable-color | $color-text-disable | 不可操作内容色，用于预置内容、无效内容、特殊不可点击按钮、组件边框线等。 |

步骤 3.修复报错 2 后，检查当前页面中使用的组件或 icon。

发现 NavBar 组件中的返回按钮消失了。检测发现：使用了 name 属性。
