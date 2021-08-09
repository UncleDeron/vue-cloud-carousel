<template>
    <ul class="wrap noselect" ref="carousel">
        <slot></slot>
    </ul>
</template>

<script>
import CloudCarouselItem from '../carousel-item/cloud-carousel-item'
import Emitter from '../util/emitter'

let cancelFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
let requestFrame = window.requestAnimationFrame;

export default {
    name: 'CloudCarousel',
    componentName: 'CloudCarousel',
    components: {CloudCarouselItem},
    mixins: [Emitter],
    data() {
        return {
            carouselOptions: {
            },
            defaultOptions: {
                xOrigin: null,        // null: calculated automatically
                yOrigin: null,
                xRadius: null,
                yRadius: null,
                farScale: 0.5,        // scale of the farthest item
                transforms: true,     // enable CSS transforms
                smooth: true,         // enable smooth animation via requestAnimationFrame()
                fps: 30,              // fixed frames per second (if smooth animation is off)
                speed: 4,             // positive number
                autoPlay: 0,          // [ 0: off | number of items (integer recommended, positive is clockwise) ]
                autoPlayDelay: 4000,
                bringToFront: false,
                itemClass: 'carousel-item',
                frontItemClass: 'current-item',
                handle: 'carousel',
                farOpacity: 0.5
            },

            autoPlayTimer: 0,
            rotation: Math.PI/2, // start with the first item positioned in front
            destRotation: Math.PI/2,
            timer: 0,
            itemOptions: {
                transforms: true
            },
            items: [],
            initTimer: null,
            currentItem: null,
        };
    },
    props: {
        options: {
            xOrigin: null,        // null: calculated automatically
            yOrigin: null,
            xRadius: null,
            yRadius: null,
            farScale: 0.5,        // scale of the farthest item
            transforms: true,     // enable CSS transforms
            smooth: true,         // enable smooth animation via requestAnimationFrame()
            fps: 30,              // fixed frames per second (if smooth animation is off)
            speed: 4,             // positive number
            autoPlay: 0,          // [ 0: off | number of items (integer recommended, positive is clockwise) ]
            autoPlayDelay: 4000,
            bringToFront: false,
            itemClass: 'cloud9-item',
            frontItemClass: null,
            handle: 'carousel',
            farOpacity: 0.5
        }
    },
    methods: {
        renderItem (itemIndex, rotation) {
            let item = this.items[itemIndex];
            let sin = Math.sin(rotation);
            let farScale = this.carouselOptions.farScale;
            let farOpacity = this.carouselOptions.farOpacity;
            let scale = farScale + ((1-farScale) * (sin+1) * 0.5);
            let opacity = farScale + ((1-farOpacity) * (sin+1) * 0.5);

            item.moveTo(
                this.carouselOptions.xOrigin + (scale * ((Math.cos(rotation) * this.carouselOptions.xRadius) - (item.fullWidth * 0.5))),
                this.carouselOptions.yOrigin + (scale * sin * this.carouselOptions.yRadius),
                scale,
                opacity
            );

            return item;
        },
        render() {
            let count = this.items.length;
            let spacing = 2 * Math.PI / count;
            let radians = this.rotation;
            let nearest = this.nearestIndex();

            for( let i = 0; i < count; i++ ) {
                let item = this.renderItem( i, radians );

                if( i === nearest ) {
                    item.element.classList.add( this.carouselOptions.frontItemClass );
                    this.currentItem = item
                } else {
                    item.element.classList.remove( this.carouselOptions.frontItemClass );
                }

                radians += spacing;
            }

            this.$emit('rendered', this);
        },
        playFrame() {
            let rem = this.destRotation - this.rotation;
            let now = this.time();
            let dt = (now - this.lastTime) * 0.002;
            this.lastTime = now;

            if( Math.abs(rem) < 0.003 ) {
                this.rotation = this.destRotation;
                this.pause();
                this.$emit('animationFinished', this)
            } else {
                // Asymptotically approach the destination
                this.rotation = this.destRotation - rem / (1 + (this.carouselOptions.speed * dt));
                this.scheduleNextFrame();
            }

            this.render();
        },
        scheduleNextFrame() {
            this.lastTime = this.time();

            this.timer = this.carouselOptions.smooth && cancelFrame ?
                requestFrame( this.playFrame ) :
                setTimeout( this.playFrame, 1000 / this.carouselOptions.fps );
        },
        itemsRotated() {
            return this.items.length * ((Math.PI/2) - this.rotation) / (2*Math.PI);
        },
        floatIndex() {
            let count = this.items.length;
            let floatIndex = this.itemsRotated() % count;

            // Make sure float-index is positive
            return (floatIndex < 0) ? floatIndex + count : floatIndex;
        },
        nearestIndex() {
            return Math.round( this.floatIndex() ) % this.items.length;
        },

        play() {
            if( this.timer === 0 )
                this.scheduleNextFrame();
        },
        pause() {
            this.carouselOptions.smooth && cancelFrame ? cancelFrame( this.timer ) : clearTimeout( this.timer );
            this.timer = 0;
        },

        //
        // Spin the carousel by (+-) count items
        //
        go( count ) {
            this.$emit('beforeRender', this)
            this.destRotation += (2 * Math.PI / this.items.length) * count;
            this.play();
        },

        goTo( index ) {
            let count = this.items.length;

            // Find the shortest way to rotate item to front
            let diff = index - (this.floatIndex() % count);

            if( 2 * Math.abs(diff) > count )
                diff -= (diff > 0) ? count : -count;

            // Halt any rotation already in progress
            this.destRotation = this.rotation;

            // Spin the opposite way to bring item to front
            this.go( -diff );

            // Return rotational distance (in items) to the target
            return diff;
        },

        // deactivate() {
        //     this.pause();
        //     clearInterval( this.autoPlayTimer );
        //     if( this.options.buttonLeft ) this.options.buttonLeft.unbind( 'click' );
        //     if( this.options.buttonRight ) this.options.buttonRight.unbind( 'click' );
        //     $container.unbind( '.cloud9' );
        // },

        autoPlay() {
            this.autoPlayTimer = setInterval(
                () => {
                    this.go( this.carouselOptions.autoPlayAmount )
                },
                this.carouselOptions.autoPlayDelay
            );
        },

        enableAutoPlay() {
            // Stop auto-play on mouse over
            this.$on('handleItemMouseOver', () => {
                clearInterval( this.autoPlayTimer );
            })


            // Resume auto-play when mouse leaves the container
            this.$on('handleItemMouseOut', () => {
                this.autoPlay();
            })

            this.autoPlay();
        },

        bindControls() {
            let self = this;
            if( this.options.buttonLeft ) {
                this.options.buttonLeft.bind( 'click', function() {
                    self.go( -1 );
                    return false;
                } );
            }

            if( this.options.buttonRight ) {
                this.options.buttonRight.bind( 'click', function() {
                    self.go( 1 );
                    return false;
                } );
            }


            if( this.options.bringToFront ) {
                this.$on('handleItemClick', (item) => {
                    if( item ) {
                        this.goTo( this.items.indexOf( item ) );
                        this.$emit('itemClick', item)
                    }
                })
            }
        },



        finishInit() {
            this.items =  this.$children;

            clearInterval( this.initTimer );

            // Init items
            for(let i = 0; i < this.items.length; i++ ) {
                let prev, next;
                if (i === 0) {
                    next = this.items[this.items.length - 1]
                } else {
                    next = this.items[i - 1]
                }
                if (i === this.items.length - 1) {
                    prev = this.items[0]
                } else {
                    prev = this.items[i + 1]
                }
                this.items[i].init(this.carouselOptions.transforms, prev, next);
            }

            // Disable click-dragging of items
             this.$refs.carousel.addEventListener( 'mousedown', () => false );
             this.$refs.carousel.addEventListener( 'onselectstart', () => false );

            if( this.carouselOptions.autoPlayAmount !== 0 ) this.enableAutoPlay();
            this.bindControls();
            this.render();
            this.$emit('loaded', this)
        },

        initRenderParams() {
            this.carouselOptions = Object.assign({}, this.defaultOptions, this.options);
            this.carouselOptions.autoPlayAmount = this.options.autoPlay;
            this.carouselOptions.xOrigin = (!this.options.xOrigin) ? this.$refs.carousel.clientWidth  * 0.5 : this.options.xOrigin;
            this.carouselOptions.yOrigin = (!this.options.yOrigin) ? this.$refs.carousel.clientHeight * 0.1 : this.options.yOrigin;
            this.carouselOptions.xRadius = (!this.options.xRadius) ? this.$refs.carousel.clientWidth  / 2.3 : this.options.xRadius;
            this.carouselOptions.yRadius = (!this.options.yRadius) ? this.$refs.carousel.clientHeight / 6   : this.options.yRadius;
        },

        time() {
            return !window.performance || !window.performance.now ?
                +new Date()  :
                performance.now();
        },

        getNextItem() {
            return this.items[this.nearestIndex()].next;
        },

        getPrevItem() {
            return this.items[this.nearestIndex()].prev;
        },

        getNearestItem() {
            return this.items[this.nearestIndex()];
        },

        setOptions(options) {
            this.carouselOptions = Object.assign({}, this.carouselOptions, options);
            this.render()
        },

        goNext() {
            clearInterval( this.autoPlayTimer );
            this.go(1)
            if( this.carouselOptions.autoPlayAmount !== 0 ) this.autoPlay();
        },

        goPrev() {
            clearInterval( this.autoPlayTimer );
            this.go(-1)
            if( this.carouselOptions.autoPlayAmount !== 0 ) this.autoPlay();
        },

        pauseAutoPlay() {
            clearInterval( this.autoPlayTimer );
        },

        resumeAutoPlay() {
            this.autoPlay();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initRenderParams();
            this.initTimer = setInterval( () => { this.finishInit() }, 50 );
        })
    },
    beforeDestroy() {
        clearInterval( this.autoPlayTimer );
    },
    created() {
    }
};
</script>

<style scoped>
    .wrap {
        padding: 0;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
