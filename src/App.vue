<template>
    <div id="app">
        <h1>{{title}}</h1>
        <p>Welcome to {{browser}}</p>
        <div id="carousel">
            <cloudCarousel :options="options" @animationFinished="animationFinishHandler" @beforeRender="beforeRenderedHandler" @loaded="loadedHandler" @itemClick="clickItemHandler">
                <cloud-carousel-item :params="{name: 'Firefox'}">
                    <img class="carousel-item" src="./assets/browsers/firefox.png">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Wyzo'}">
                    <img class="carousel-item" src="./assets/browsers/wyzo.png">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Chrome'}">
                    <img class="carousel-item" src="./assets/browsers/chrome.png">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Safari'}">
                    <img class="carousel-item" src="./assets/browsers/safari.png">
                </cloud-carousel-item>
                <cloud-carousel-item :params="{name: 'Internet Explore'}">
                    <img class="carousel-item" src="./assets/browsers/iexplore.png">
                </cloud-carousel-item>
            </cloudCarousel>
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
</style>
