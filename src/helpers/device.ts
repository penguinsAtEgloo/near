const { userAgent } = navigator;
export const isKakaotalk = userAgent.toLowerCase().indexOf('kakaotalk') > -1;
