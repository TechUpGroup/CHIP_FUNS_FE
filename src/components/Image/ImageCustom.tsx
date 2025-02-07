'use client';

import NextImage, { ImageLoaderProps, ImageProps } from 'next/image';
import { forwardRef, useState } from 'react';

import { getAssetUrl } from '@/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const fallbackSrc = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';

export const ImageCustom = forwardRef<HTMLImageElement, ImageProps>(function Component({ src, ...props }, ref) {
  const [isError, setIsError] = useState(false);
  const handleError = () => setIsError(true);

  return (
    <NextImage
      ref={ref}
      src={isError ? fallbackSrc : getAssetUrl(src)}
      onError={handleError}
      // loader={imageLoader}
      {...props}
    />
  );
});
