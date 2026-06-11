# 有期日历——倒计时万年历工具

移动端优先的倒计时万年历工具，包含公历、农历、节气、法定节假日、提醒、个人日程、倒计时和拼假工具。

当前版本支持作为 PWA 使用：用户打开线上链接后，可在手机浏览器中添加到主屏幕，像 App 一样从桌面启动。

## 入口

- 页面入口：`index.html`
- 样式：`styles.css`
- 交互：`script.js`
- 日历数据：`calendar-data.js`
- 本地持久化：`user-data-store.js`

## 日常维护

- 改视觉：优先改 `styles.css` 顶部变量区
- 改文案和模块顺序：改 `index.html`
- 改节日、节气、假期数据：改 `calendar-data.js`
- 改提醒、日程、主题等交互：改 `script.js`
- 改本机保存逻辑：改 `user-data-store.js`

更详细的维护方式见 [维护说明.md](/Users/ren/Documents/可交互网页/维护说明.md)。
