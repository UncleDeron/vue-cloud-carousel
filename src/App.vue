<template>
    <div id="app">
        <h1>{{title}}</h1>
        <p>Welcome to {{browser}}</p>
        <div id="carousel">
            <cloudCarousel :options="options" @animationFinished="animationFinishHandler" @beforeRender="beforeRenderedHandler" @loaded="loadedHandler" @itemClick="clickItemHandler" ref="carousel">
                <cloud-carousel-item :params="{name: 'Firefox'}">
                    <img class="carousel-item" src="./assets/browsers/firefox.png" alt="Firefox">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Wyzo'}">
                    <img class="carousel-item" src="./assets/browsers/wyzo.png" alt="wyzo">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Chrome'}">
                    <img class="carousel-item" src="./assets/browsers/chrome.png" alt="Chrome">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Safari'}">
                    <img class="carousel-item" src="./assets/browsers/safari.png" alt="Safari">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Internet Explore'}">
                    <img class="carousel-item" src="./assets/browsers/iexplore.png" alt="Internet Explorer">
                </cloud-carousel-item>
            </cloudCarousel>
        </div>
        <div class="option-form">
            <div class="form-item">
                <span class="form-label">yOrigin:</span>
                <input type="text" v-model.number="options.yOrigin">
            </div>
            <div class="form-item">
                <span class="form-label">yRadius:</span>
                <input type="text" v-model.number="options.yRadius">
            </div>
        </div>
        <div class="button-wrap">
            <button class="buttonLeft" @click="goPrev">←</button>
            <button class="buttonPause" @click="pause" v-if="autoPlayCtrl === 'Pause'">Pause</button>
            <button class="buttonPause" @click="resume" v-else>Resume</button>
            <button class="buttonSetOptions" @click="setOptions">SetOptions</button>
            <button class="buttonRight" @click="goNext">→</button>
        </div>

    </div>
</template>

<script>
import CloudCarousel from './cloud-carousel/carousel/cloud-carousel'
import CloudCarouselItem from './cloud-carousel/carousel-item/cloud-carousel-item';

export default {
    name: 'app',
    components: { CloudCarouselItem, CloudCarousel},
    data() {
        return {
            browser: 'Firefox',
            options: {
                yOrigin: 42,
                yRadius: 48,
                autoPlay: 1,
                bringToFront: true
            },
            autoPlayCtrl: 'Pause',
            title: 'CloudCarousel for Vue 2.x'
        };
    },
    methods: {
        animationFinishHandler(e) {
            let item = e.getNearestItem();
            console.log('animationFinish: ' + item.params.name)
        },
        beforeRenderedHandler(e) {
            let item = e.getNextItem();
            this.browser = item.params.name;
            console.log('beforeRendered:' + item.params.name)
        },
        loadedHandler(e) {
            let item = e.getNearestItem();
            this.browser = item.params.name;
            console.log('onLoaded:' + item.params.name)
        },
        clickItemHandler(item) {
            this.browser = item.params.name;
            console.log('click:' + item.params.name)
        },

        goPrev() {
            this.$refs.carousel.goPrev();
        },

        goNext() {
            this.$refs.carousel.goNext();
        },

        pause() {
            this.$refs.carousel.pauseAutoPlay();
            this.autoPlayCtrl = 'Resume'
        },

        resume() {
            this.$refs.carousel.resumeAutoPlay();
            this.autoPlayCtrl = 'Pause'
        },

        setOptions() {
            this.$refs.carousel.setOptions(this.options)
        }
    }
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 100vw;
    height: 100vh;
}

h1 {
    font-weight: normal;
    text-align: center;
    padding: 60px;
}

p {
    text-align: center;
    font-size: 36px;
}

#carousel {
    width: 800px;
    height: 400px;
    margin: 0 auto;
}

.carousel-item {
    width: 160px;
    height: 160px;
}

.button-wrap {
    text-align: center;
}

.button-wrap button {
    padding: 8px 12px;
    margin: 0 8px;
    cursor: pointer;
}

.option-form {
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-item {
    margin: 0 20px 20px;
}

.form-item input {
    height: 30px;
    text-indent: 8px;
    border-radius: 4px;
    border: 1px solid #bbb;
    color: #666;
}
</style>
