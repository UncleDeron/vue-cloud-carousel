import {CloudCarouselItemComponent} from './cloudCarouselItem'

export interface CloudCarouselOptions {
    xOrigin?: number,        // null: calculated automatically
    yOrigin?: number,
    xRadius?: number,
    yRadius?: number,
    farScale?: number,        // scale of the farthest item
    transforms?: boolean,     // enable CSS transforms
    smooth?: boolean,         // enable smooth animation via requestAnimationFrame()
    fps?: number,              // fixed frames per second (if smooth animation is off)
    speed?: number,             // positive number
    autoPlay?: 0 | 1,          // [ 0: off | number of items (integer recommended, positive is clockwise) ]
    autoPlayDelay?: number,
    bringToFront?: boolean,
    itemClass?: string,
    frontItemClass?: string,
    handle?: string,
    farOpacity?: number
}

export declare class CloudCarouselComponent {
    options: CloudCarouselOptions;

    go(count): void;

    goTo(index): void;
    
    getNextItem: () => CloudCarouselItemComponent;
    
    getPreviousItem: () => CloudCarouselItemComponent;

    getNearestItem: () => CloudCarouselItemComponent;

    setOptions: (options: CloudCarouselOptions) => void;
    
    goNext(): void;
    
    goPrev(): void;
    
    pauseAutoPlay(): void;
    
    resumeAutoPlay(): void;
    
}
