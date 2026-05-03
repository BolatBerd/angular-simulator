import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';

export interface IThemeOptions {
  name: string;
  value: Theme;
  preset: Preset;
}
