import { ENV } from './env';
import { db_uri_prod, db_uri_dev } from './secrets';

export const appVersion = 'v.0.7.0';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'https://www.maker-puzzle.com';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = 'UA-128508172-1';


export const db_uri = isProduction? db_uri_prod : db_uri_dev



