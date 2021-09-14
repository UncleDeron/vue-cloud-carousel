# vue-cloud-carousel

基于Vue 2.x开发的高性能3D景深轮播组件

## Features

- 支持 Vue 2.x
- 很快
- [好使](#basic-usage)
- *(可选)* 支持点击选中
- *(可选)* 支持自动播放
- 支持 [requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame)
- 支持 CSS transforms ([浏览器支持列表](http://caniuse.com/transforms))

## 文档

### 基本用法

安装

``` bash
npm install vue-cloud-carousel
```

引入

```javascript
// main.js (global)
import { CloudCarousel, CloudCarouselItem } from 'vue-cloud-carousel'

Vue.use(CloudCarousel);
Vue.use(CloudCarouselItem);

// 或者

// xxx.vue (component)
import { CloudCarousel, CloudCarouselItem } from 'vue-cloud-carousel'

export default {
    name: 'example',
    components: { CloudCarouselItem, CloudCarousel},
    data() {
        return {
            key: 'value'
        }
    }
};


```

template:
```html
<div id="carousel">
    <cloudCarousel :options="options">
        <cloud-carousel-item>
            <img class="carousel-item" src="./assets/browsers/firefox.png" alt="Firefox">
        </cloud-carousel-item>
        <cloud-carousel-item>
            <img class="carousel-item" src="./assets/browsers/wyzo.png" alt="Firefox">
        </cloud-carousel-item>
        <cloud-carousel-item>
            <img class="carousel-item" src="./assets/browsers/chrome.png" alt="Firefox">
        </cloud-carousel-item>
        <cloud-carousel-item>
            <img class="carousel-item" src="./assets/browsers/safari.png" alt="Firefox">
        </cloud-carousel-item>
        <cloud-carousel-item>
            <img class="carousel-item" src="./assets/browsers/iexplore.png" alt="Firefox">
        </cloud-carousel-item>
    </cloudCarousel>
</div>
```

script:
```js

export default {
    name: 'app',
    data() {
        return {
            options: {
                yOrigin: 42,
                yRadius: 48,
                autoPlay: 1,
                bringToFront: true
            },
        };
    }
};
```

### Carousel options

<table>
  <tr>
    <th>选项</th>
    <th>描述</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>xOrigin</td>
    <td>轮播中心点横向坐标</td>
    <td>(组件宽度 / 2)</td>
  </tr>
  <tr>
    <td>yOrigin</td>
    <td>轮播图中心点纵向坐标</td>
    <td>(组件高度 / 10)</td>
  </tr>
  <tr>
    <td>xRadius</td>
    <td>轮播图横向半径</td>
    <td>(组件宽度 / 2.3)</td>
  </tr>
  <tr>
    <td>yRadius</td>
    <td>轮播图纵向半径</td>
    <td>(组件高度 / 6)</td>
  </tr>
  <tr>
    <td>farScale</td>
    <td>距离当前活动元素最远的元素的缩放比例（0-1）</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>farOpacity</td>
    <td>距离当前活动元素最远的元素的透明度（0-1）</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>transforms</td>
    <td>如果浏览器支持的话，是否使用原生 CSS 的 transform 属性</td>
    <td>true</td>
  </tr>
  <tr>
    <td>smooth</td>
    <td>如果浏览器支持的话，是否通过 requestAnimationFrame API 使用最大帧率</td>
    <td>true</td>
  </tr>
  <tr>
    <td>fps</td>
    <td>如果 smooth 为 false 时，每秒帧数</td>
    <td>30</td>
  </tr>
  <tr>
    <td>speed</td>
    <td>元素移动速度: <b>1</b> 最慢, <b>4</b> 中等, <b>10</b> 最快  </td>
    <td>4</td>
  </tr>
  <tr>
    <td>autoPlay</td>
    <td>是否开启自动轮播： <b>0</b> 关闭；如果鼠标移至轮播图上，自动轮播将暂停。  查看: <b>autoPlayDelay</b></td>
    <td>0</td>
  </tr>
  <tr>
    <td>autoPlayDelay</td>
    <td>两次自动轮播之间的时间间隔，单位毫秒</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>bringToFront</td>
    <td>是否支持将鼠标点击元素设置为当前活动元素</td>
    <td>false</td>
  </tr>
</table>

Basic methods:

<table>
  <tr>
    <th>方法</th>
    <th>描述</th>
    <th>参数</th>
  </tr>
  <tr>
    <td>go( count )</td>
    <td>设置距离当前活动元素的第count个元素为最前方的活动元素</td>
    <td><b>count</b>: 距离当前活动元素的个数 (<b>+</b> 正向, <b>-</b> 反向)</td>
  </tr>
  <tr>
    <td>goTo( index )</td>
    <td>设置列表中第index个元素为最前方的活动元素</td>
    <td><b>index</b>: 元素在元素列表中的索引</td>
  </tr>
  <tr>
    <td>getNearestItem()</td>
    <td>获取最前方活动元素的组件实例 <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>getNextItem()</td>
    <td>获取自动轮播中下一个活动元素的组件实例 <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>getPrevItem()</td>
    <td>获取自动轮播中上一个活动元素的组件实例 <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>goPrev()</td>
    <td>移至上一个元素</td>
    <td>none</td>
  </tr>
  <tr>
    <td>goNext()</td>
    <td>移至下一个元素</td>
    <td>none</td>
  </tr>
  <tr>
    <td>setOptions( options )</td>
    <td>重置设置项</td>
    <td>options: 查看 <a href="#carousel-options">Carousel options
</a></td>
  </tr>
</table>

## 运行示例

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

