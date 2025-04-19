# Vue 3 + TypeScript + Vite

1、element-plus 的安装和导入配置 : https://element-plus.sxtxhy.com/zh-CN/guide/installation.html
2、定制css 安装sass  npm i sass -D 


HTML简单学习
1、<ul> —— Unordered List（无序列表）
   列表项自动以 圆点（•）、方点（◦）或 竖线（|）等符号标记，项目之间无需特定顺序
   典型场景：导航菜单、注意事项、条款列表等不强调顺序的内容
2、<ol> —— Ordered List（有序列表）
   列表项自动以 数字（1, 2, 3…）或 字母（A, B, C…）标记，项目需要严格按顺序排列
3、<li> —— List Item（列表项）
   只能作为 <ul> 或 <ol> 的直接子节点

4、 dl dt dd的用法 --》 dl 内容块；dt 内容块的标题；dd 内容
    <dl>
    <dt>标题</dt>
    <dd>内容1</dd>
    <dd>内容2</dd>
    </dl>


5、<RouterLink>包裹的标签默认当成a标签，有属性，需要设置a {display: block}防止下面包裹的页面属性css错乱




CSS 的简单学习
1、"margin: 0 auto": 实现水平居中 margin-top 和 margin-bottom 设置为 0（即上下没有额外的外边距）。
margin-left 和 margin-right 设置为 auto
生效的条件：1、子元素必须是块级元素；2. 父容器必须有宽度约束 3. 子元素需要指定宽度

2、position：static 默认值，没有定位；
   relative： 相对定位 -》 元素相对于其正常位置进行定位，可以通过top、right、bottom、left属性调整位置。
   absolute： 绝对定位：设置绝对定位后的元素将处于悬浮状态。
   fixed： 固定定位

3、ul ~li {} 这些是表示选中ul 下面 第一个li 后面的所有元素

4、overflow: hidden;：当内容超出容器尺寸时，超出部分将被隐藏，不会显示在容器之外。
                      不会显示滚动条，用户无法滚动查看隐藏的内容。
                      超出的内容将被裁剪，即使用户想要查看也无法通过滚动来实现。
   overflow: auto;：
                当内容超出容器尺寸时，会根据需要自动显示滚动条。
                如果内容没有超出容器尺寸，不会显示滚动条。
                允许用户通过滚动条来查看超出容器尺寸的内容，提供了更好的用户体验。

5、line-height：1 ，相当于line-height：100%，会根据该元素本身的字体大小设置行高，比如字体大小是15px，行高就是15px。
6、display: block：占据整行：block 元素的默认行为是占据父元素的整个宽度，并且会把其他元素推到下一行。
                   可以设置宽高：block 元素可以设置 width 和 height 属性。
                   响应外边距：block 元素会响应上下的外边距（margin-top、margin-bottom），并会在页面中留出空白区域。
7、display: inline--> 与 block 元素不同，display: inline 的元素不会从新的一行开始显示，而是依照其内容的大小水平排列。inline 元素只占据它实际内容所需的宽度，并且不支持设置宽度和高度属性。

8、display: inline-block -> 水平排列：inline-block 元素会在一行内显示，但它们不占据整行宽度。
             支持设置宽高：inline-block 元素可以设置宽度和高度，这也是它与 inline 的主要区别。
             响应外边距：inline-block 元素的左右外边距和上下外边距都可以正常工作。

9、行内块元素适用vertical-align属性，图片、表单都属于行内块元素，默认的 vertical-align 是基线对齐。
此时可以给图片、表单这些行内块元素的 vertical-align 属性设置为 middle 就可以让文字和图片垂直 居中对齐了。




常规报错处理

vue3在引入组件时报'has no default export'

禁用 Vetur 的脚本验证
- 在 VS Code 的 `settings.json` 文件中添加以下配置：
  ```json
  { 
    "vetur.validation.script": false
  }


  router.replace({path:'/'})
  解释 ： router.replace 不会向浏览器的历史记录中添加新记录，而是替换掉当前的历史记录。这意味着用户在导航后使用浏览器的后退按钮将不会返回到先前的页面。