<template>
    <div id="app">
        <h1>{{title}}</h1>
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
            options: {
                yOrigin: 42,
                yRadius: 48,
                autoPlay: 1,
                bringToFront: true
            },
            title: 'CloudCarousel for Vue 2.x'
        };
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
