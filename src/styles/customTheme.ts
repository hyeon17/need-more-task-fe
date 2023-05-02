import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    mainBg: '#FBFBFF',
    secondaryBg: '#F5F5F5',
    textColor: '#171721',
    primary: '#3E7EFF',
    warningColor: '#EF8354',
    errorColor: '#FF5C5C',
    successColor: '#5FDCB3',
    borderColor: '#212437',
    white: '#FFF',
    outlineColor: '#E4E6E8D9',
    labelColor: '#8083A3',
    inputFocusColor: '#FBB0BF',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: `'Pretendard-Regular', sans-serif`,
      },
    }),
  },
});

export default customTheme;
