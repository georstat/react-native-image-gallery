import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { Dirs } from 'react-native-file-access';
import { CachedImage, CacheManager } from '@georstat/react-native-image-cache';

import {
  ImageGallery,
  ImageObject,
} from '@georstat/react-native-image-gallery';
import { images } from './helpers';
import Header from './Header';
import Footer from './Footer';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomGalleryOpen, setIsCustomGalleryOpen] = useState(false);

  const openGallery = () => setIsOpen(true);
  const openCustomGallery = () => setIsCustomGalleryOpen(true);

  const closeGallery = () => setIsOpen(false);
  const closeCustomGallery = () => setIsCustomGalleryOpen(false);

  const renderHeaderComponent = (_image: ImageObject, currentIndex: number) => {
    return <Header currentIndex={currentIndex} />;
  };

  const renderFooterComponent = (_image: ImageObject, currentIndex: number) => {
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
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>
        <Button onPress={openGallery} title="Open Gallery" />
        <Button onPress={openCustomGallery} title="Open Custom Gallery" />
        <ImageGallery
          close={closeGallery}
          images={images}
          isOpen={isOpen}
          resizeMode="contain"
        />
        <ImageGallery
          close={closeCustomGallery}
          hideThumbs
          images={images}
          isOpen={isCustomGalleryOpen}
          renderCustomImage={renderCustomImage}
          renderFooterComponent={renderFooterComponent}
          renderHeaderComponent={renderHeaderComponent}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  customImageContainer: {
    alignItems: 'center',
    borderRadius: 11,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  customImage: {
    borderColor: 'green',
    borderRadius: 250,
    borderWidth: 3,
    height: 300,
    overflow: 'hidden',
    width: 300,
  },
});

export default App;
