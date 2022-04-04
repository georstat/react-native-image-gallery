# React Native Image Gallery with Thumbnails

[![npm version](https://img.shields.io/npm/v/@georstat/react-native-image-gallery.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-gallery)
[![npm](https://img.shields.io/npm/dt/@georstat/react-native-image-gallery.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-gallery)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub package.json version](https://img.shields.io/github/package-json/v/georstat/react-native-image-gallery?style=for-the-badge)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)

## Features

- Image gallery with thumbnails
- Made with `PanResponder`, no external dependencies
- Written in `Typescript`

### If you're looking for Image caching visit [@georstat/react-native-image-cache](https://github.com/georstat/react-native-image-cache)

### Default Gallery Preview:

![@georstat:react-native-image-gallery default_demo](https://user-images.githubusercontent.com/717975/142775028-32cdfdd0-feef-48e8-9dfc-b749d5e01972.gif)

### Custom Gallery Preview:

![@georstat:react-native-image-gallery default_demo](https://user-images.githubusercontent.com/717975/142775046-475bfc3b-6326-4b3d-afa3-58189e003043.gif)

## Installation

#### yarn:

```bash
yarn add @georstat/react-native-image-gallery
```

#### npm:

```bash
npm i @georstat/react-native-image-gallery
```

## Usage

#### Simple Gallery with thumbs:

```tsx
import { ImageGallery } from '@georstat/react-native-image-gallery';

const images = [
  {
    id: 1,
    url: 'https://...',
    // any other extra info you want
  },
  ...
]

const MyGallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openGallery = () => setIsOpen(true);
    const closeGallery = () => setIsOpen(false);

    return (
        <View>
            <Button onPress={openGallery} title="Open Gallery" />
            <ImageGallery close={closeGallery} isOpen={isOpen} images={images} />
        </View>
    )
}
```

#### Custom Gallery without thumbs:

For more info check [example](https://github.com/georstat/react-native-image-gallery/tree/main/example/src)

This example uses [georstat/react-native-image-cache](https://github.com/georstat/react-native-image-cache) for image caching

```tsx
import { ImageGallery } from '@georstat/react-native-image-gallery';
import { CacheManager, CachedImage } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import {
  ImageGallery,
  ImageObject,
} from '@georstat/react-native-image-gallery';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

const MyGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  const renderHeaderComponent = (image: ImageObject, currentIndex: number) => {
    return <Header currentIndex={currentIndex} />;
  };

  const renderFooterComponent = (image: ImageObject, currentIndex: number) => {
    return <Footer total={images.length} currentIndex={currentIndex} />;
  };

  const renderCustomImage = (image: ImageObject) => {
    return (
      <View style={styles.customImageContainer}>
        <CachedImage
          resizeMode="cover"
          source={image.url}
          style={styles.customImage}
          thumbnailSource="https://via.placeholder.com/350x150"
        />
      </View>
    );
  };
  return (
    <View>
      <Button onPress={openGallery} title="Open Gallery" />
      <ImageGallery
        close={closeCustomGallery}
        hideThumbs
        images={images}
        isOpen={isCustomGalleryOpen}
        renderCustomImage={renderCustomImage}
        renderFooterComponent={renderFooterComponent}
        renderHeaderComponent={renderHeaderComponent}
      />
    </View>
  );
};
```

## Props

#### `CachedImage` accepts the following props:

| Properties              | PropType  | Description                                                                                                                                        |
|-------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `isOpen`                | `Boolean` | (**Required**) when to show the gallery.                                                                                                           |
| `images`                | `Array`   | (**Required**) array of objects. Every image must have a `url` (required), a thumbUrl (optional) and id (optional) and any other info you need     |
| `resizeMode`            | `string`  | React Native Image component [resizeMode](https://reactnative.dev/docs/image#resizemode) defaults to `contain`, used on images                     |
| `close`                 | `Func`    | (**Required**) function to close the gallery image                                                                                                 |
| `disableSwipe`          | `Boolean` | Disables the swipe gesture.                                                                                                                        |
| `initialIndex`          | `Number`  | Initial index of image to snap when opening the gallery                                                                                            |
| `thumbSize`             | `Number`  | Height and width of the thumb, defaults to `48`                                                                                                    |
| `thumbColor`            | `string`  | Outline color of selected thumb, defaults to `#d9b44a`                                                                                             |
| `thumbResizeMode`       | `string`  | React Native Image component [resizeMode](https://reactnative.dev/docs/image#resizemode) defaults to `cover`, used on thumbnails                   |
| `hideThumbs`            | `Boolean` | Set to true to hide the thumbs defaults to `false`                                                                                                 |
| `renderCustomThumb`     | `Func`    | Function to render a custom thumb. Accepts image, index and if the thumb is selected, eg. `(image:Image, index:number, isSelected:boolean) => ...` |
| `renderCustomImage`     | `Func`    | Function to render a custom Image. Accepts image, index and if the thumb is selected, eg. `(image:Image, index:number, isSelected:boolean) => ...` |
| `renderHeaderComponent` | `Func`    | Function to render a custom header at the top of the screen. Accepts image and current index, eg. `(image:Image, currentIndex:number) => ...`      |
| `renderFooterComponent` | `Func`    | Function to render a custom header at the top of the screen. Accepts image and current index eg. `(image:Image, currentIndex:number) => ...`       |

## Todo:

- [ ] Add zoom factor

- [ ] Add prop to keep zoom and double tap to zoom out

## Authors:

- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
