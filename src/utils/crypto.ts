import { MD5 } from 'crypto-js';

export const md5 = (str: string) => MD5(str).toString();
