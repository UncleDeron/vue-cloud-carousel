import CloudCarousel from './carousel/index.js';
import CloudCarouselItem from './carousel-item/index.js';

const components = [CloudCarousel, CloudCarouselItem];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

export { CloudCarousel, CloudCarouselItem};
