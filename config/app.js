import { ENV } from './env';
import { db_uri_prod, db_uri_dev } from './secrets';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'http://ec2-13-124-27-145.ap-northeast-2.compute.amazonaws.com';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

export const db_uri = isProduction? db_uri_prod : db_uri_dev



