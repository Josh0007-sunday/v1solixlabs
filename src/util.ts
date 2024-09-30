import CryptoJS from 'crypto-js';

export const splDiscriminate = (discriminator: string, length: number = 8): string => {
  const wordArray = CryptoJS.SHA256(discriminator);
  const hash = wordArray.toString(CryptoJS.enc.Hex);
  return hash.slice(0, length);
};