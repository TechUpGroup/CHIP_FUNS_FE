'use client';

import { AspectRatio, AspectRatioProps, Box, BoxProps, Center, Skeleton } from '@chakra-ui/react';
import Image, { ImageLoaderProps, ImageProps } from 'next/image';
import { memo, PropsWithChildren, SyntheticEvent, useState } from 'react';

import { getAssetUrl } from '@/utils';

export type ImageRatioProps = Omit<ImageProps, 'alt'> &
  BoxProps &
  Pick<AspectRatioProps, 'ratio'> & {
    disableLoading?: boolean;
    alt?: string;
    fallbackSrc?: string;
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const AspectRatioWrap = ({
  ratio,
  borderRadius,
  children,
}: PropsWithChildren & Pick<AspectRatioProps, 'ratio'> & Pick<AspectRatioProps, 'borderRadius'>) => {
  if (ratio === undefined) return children;
  return (
    <AspectRatio w="full" ratio={ratio} position="relative" overflow="hidden" borderRadius={borderRadius}>
      {children}
    </AspectRatio>
  );
};

export const ImageRatio = (props: ImageRatioProps) => {
  const {
    src,
    alt = '',
    fallbackSrc = 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
    bgGradient,
    priority,
    quality,
    ratio,
    disableLoading,
    ...rest
  } = props;

  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);
  const handleLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.naturalWidth === 0) {
      setIsError(true);
    } else setIsLoaded(true);
  };
  const handleError = () => setIsError(true);

  return (
    <Box {...rest}>
      <AspectRatioWrap ratio={ratio} borderRadius={props.borderRadius}>
        <Skeleton
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          loading={!disableLoading && !isLoaded}
        >
          <Image
            src={isError ? fallbackSrc : getAssetUrl(src)}
            // loader={imageLoader}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            quality={quality}
          />
          <Box position="absolute" top="0" left="0" width="100%" height="100%" bgGradient={bgGradient} />
        </Skeleton>
      </AspectRatioWrap>
    </Box>
  );
};

export const ImageAvatar = ({
  src,
  username,
  w,
}: {
  username: string | undefined;
  src: string | undefined;
  w: ImageRatioProps['w'];
}) => {
  if (!src) {
    return (
      <Center
        w={w}
        h={w}
        rounded={999}
        bg="rgba(102, 112, 133, 1)"
        color="rgba(208, 213, 221, 1)"
        fontSize={18}
        fontWeight={600}
        textTransform="uppercase"
      >
        {username
          ?.split(/(\s+)/)
          .map((e) => e.trim())
          .filter((e) => !!e)
          .map((e) => e[0])
          .slice(0, 2)
          .join('')}
      </Center>
    );
  }
  return <ImageRatio src={src} ratio={1} w={w} alt="" rounded={999} overflow="hidden" />;
};
export const ImageRatioMemo = memo(ImageRatio);
