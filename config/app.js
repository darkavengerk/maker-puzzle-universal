import { ENV } from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'http://ec2-13-124-27-145.ap-northeast-2.compute.amazonaws.com';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

