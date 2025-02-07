import { Box, FlexProps } from '@chakra-ui/react';
import { FlexCenter } from '@/components/Flex';

type Props = FlexProps & {
  dotBlack?: boolean;
};
export const TitleWithDot = ({ dotBlack, children, ...props }: Props) => {
  return (
    <FlexCenter gap={1} {...props}>
      <Box w="3px" h="3px" bg={dotBlack ? 'black' : 'white'} />
      <Box fontSize={8} fontWeight={500} lineHeight={1.75}>
        {children}
      </Box>
    </FlexCenter>
  );
};
