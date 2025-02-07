import { SystemStyleObject } from '@chakra-ui/react';

export const scrollbarStyle: SystemStyleObject = {
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'white',
  },
};

export const scrollbarHiddenStyle: SystemStyleObject = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
};
