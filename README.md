# vue-cloud-carousel

High performance 3D-perspective carousel for Vue 2.x, base on [cloud9carousel](https://github.com/specious/cloud9carousel)

## Features

- Works with Vue 2.x
- Extremely fast
- [Easy to use](#basic-usage)
- *(optional)* Rotate clicked item to front
- *(optional)* Auto-play
- Smooth animation via [requestAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame) with fixed-FPS fallback mode
- GPU acceleration through CSS transforms ([support](http://caniuse.com/transforms) detected automatically)
- Create multiple instances
- Items can be any HTML element

## Documentation

### Basic usage

Install

``` bash
npm install vue-cloud-carousel
```

Import

```javascript
// main.js (global)
import { CloudCarousel, CloudCarouselItem } from 'vue-cloud-carousel'

Vue.use(CloudCarousel);
Vue.use(CloudCarouselItem);

// OR

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

You may pass these options to the carousel constructor.  Some of these properties may be changed during runtime via the data handle.

<table>
  <tr>
    <th>选项</th>
    <th>描述</th>
    <th>默认值</th>
  </tr>
  <tr>
    <td>xOrigin</td>
    <td>Center of the carousel (x coordinate)</td>
    <td>(container width / 2)</td>
  </tr>
  <tr>
    <td>yOrigin</td>
    <td>Center of the carousel (y coordinate)</td>
    <td>(container height / 10)</td>
  </tr>
  <tr>
    <td>xRadius</td>
    <td>Half the width of the carousel</td>
    <td>(container width / 2.3)</td>
  </tr>
  <tr>
    <td>yRadius</td>
    <td>Half the height of the carousel</td>
    <td>(container height / 6)</td>
  </tr>
  <tr>
    <td>farScale</td>
    <td>Scale of an item at its farthest point (range: 0 to 1)</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>farOpacity</td>
    <td>Opacity of an item at its farthest point (range: 0 to 1)</td>
    <td>0.5</td>
  </tr>
  <tr>
    <td>transforms</td>
    <td>Use <a href="http://learn.shayhowe.com/advanced-html-css/css-transforms">native CSS transforms</a> if <a href="http://caniuse.com/transforms">support for them is detected</a></td>
    <td>true</td>
  </tr>
  <tr>
    <td>smooth</td>
    <td>Use maximum effective frame rate via the <a href="https://developer.mozilla.org/docs/Web/API/window.requestAnimationFrame">requestAnimationFrame</a> API if <a href="http://caniuse.com/requestanimationframe">support is detected</a></td>
    <td>true</td>
  </tr>
  <tr>
    <td>fps</td>
    <td>Frames per second (if smooth animation is turned off)</td>
    <td>30</td>
  </tr>
  <tr>
    <td>speed</td>
    <td>Relative speed factor of the carousel.  Any positive number: <b>1</b> is slow, <b>4</b> is medium, <b>10</b> is fast.  Adjust to your liking</td>
    <td>4</td>
  </tr>
  <tr>
    <td>autoPlay</td>
    <td>Automatically rotate the carousel by this many items periodically (positive number is clockwise).  Auto-play is not performed while the mouse hovers over the carousel container.  A value of <b>0</b> means auto-play is turned off.  See: <b>autoPlayDelay</b></td>
    <td>0</td>
  </tr>
  <tr>
    <td>autoPlayDelay</td>
    <td>Delay, in milliseconds, between auto-play spins</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>bringToFront</td>
    <td>Clicking an item will rotate it to the front</td>
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
    <td>Spin the carousel</td>
    <td><b>count</b>: Number of carousel items to rotate (<b>+</b> is clockwise, <b>-</b> is counterclockwise)</td>
  </tr>
  <tr>
    <td>goTo( index )</td>
    <td>Spin the carousel to a specific item</td>
    <td><b>index</b>: Index of the carousel item to rotate to</td>
  </tr>
  <tr>
    <td>getNearestItem()</td>
    <td>Returns a item component of the item that is nearest to the front <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>getNextItem()</td>
    <td>Returns the right item component of the nearest item <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>getPrevItem()</td>
    <td>Returns the left item component of the nearest item <b>(CloudCarouselItem)</b></td>
    <td>none</td>
  </tr>
  <tr>
    <td>goPrev()</td>
    <td>Spin the carousel to the prev item</td>
    <td>none</td>
  </tr>
  <tr>
    <td>goNext()</td>
    <td>Spin the carousel to the next item</td>
    <td>none</td>
  </tr>
  <tr>
    <td>setOptions( options )</td>
    <td>reset the options of carousel</td>
    <td>see: <a href="#carousel-options">Carousel options
</a></td>
  </tr>
</table>

## Demo Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

