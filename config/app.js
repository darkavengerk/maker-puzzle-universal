import { ENV } from './env';
import { db_uri_prod, db_uri_dev } from './secrets';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const apiEndpoint = isDebug ? 'http://localhost:3000' : 'http://13.209.54.193';
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

export const db_uri = isProduction? db_uri_prod : db_uri_dev



