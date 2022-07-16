/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import ThemeWrapper from './ThemeWrapper';

export const wrapRootElement = ({ element }) => {
  return <ThemeWrapper>{element}</ThemeWrapper>;
};
