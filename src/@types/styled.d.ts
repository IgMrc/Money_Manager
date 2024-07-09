import 'styled-components';
import { defaultTheme } from '../styles/theme/default';

type ThemeType = typeof defaultTheme

declare module 'style-components' {
  export interface DefaultTheme extends ThemeType {}
}