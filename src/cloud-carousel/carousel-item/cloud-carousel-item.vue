<template>
    <li class="cloud-carousel-item" ref="carouselItem" @click="itemClick" @mouseover="itemMouseOver" @mouseout="itemMouseOut">
        <slot></slot>
    </li>
</template>

<script>
import Emitter from '../util/emitter';

let transform = (function() {
    let vendors = ['webkit', 'moz', 'ms'];
    let style   = document.createElement( "div" ).style;
    let trans   = 'transform' in style ? 'transform' : undefined;

    for( let i = 0, count = vendors.length; i < count; i++ ) {
        let prop = vendors[i] + 'Transform';
        if( prop in style ) {
            trans = prop;
            break;
        }
    }

    return trans;
})();

export default {
    name: 'CloudCarouselItem',
    componentName: 'CloudCarouselItem',
    mixins: [Emitter],
    data() {
        return {
            element: null,
            width: 0,
            height: 0,
            fullWidth: 0,
            fullHeight: 0,
            x: 0,
            y: 0,
            scale: 1,
            transformsOpt: true,
            prev: null,
            next: null,
        };
    },
    props: {
        params: {
            type: Object,
            default: null
        }
    },
    methods: {
        moveTo(x, y, scale, opacity) {
            this.width = this.fullWidth * scale;
            this.height = this.fullHeight * scale;
            this.x = x;
            this.y = y;
            this.scale = scale;

            let style = this.element.style;
            style.zIndex = "" + (scale * 100) | 0;

            if( transform && this.transformsOpt ) {
                style[transform] = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            } else {
                style.width = this.width + "px";
                style.left = x + "px";
                style.top = y + "px";
            }
            style.opacity = opacity
        },
        init(transformsOpt, prev, next) {
            this.element = this.$refs.carouselItem;
            this.element.item = this;
            this.fullWidth = this.element.offsetWidth;
            this.fullHeight = this.element.offsetHeight;
            this.transformsOpt = transformsOpt;
            this.prev = prev;
            this.next = next;

            if( transform && transformsOpt ) {
                this.element.style[transform + "Origin"] = "0 0";
            }
        },
        itemClick() {
            this.dispatch('CloudCarousel', 'handleItemClick', [this]);
        },
        itemMouseOver() {
            this.dispatch('CloudCarousel', 'handleItemMouseOver');
        },
        itemMouseOut() {
            this.dispatch('CloudCarousel', 'handleItemMouseOut');
        }
    },
    mounted() {

    }
};
</script>

<style scoped>
    .cloud-carousel-item {
        cursor: pointer;
        position: absolute;
        display: inline-block;
    }
</style>
