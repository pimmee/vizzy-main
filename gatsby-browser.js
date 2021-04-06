/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

 import React from 'react';
 import TopLayout from './src/TopLayout';
 
 export const wrapRootElement = ({ element }) => {
   return <TopLayout>{element}</TopLayout>;
 };
require('typeface-roboto');

