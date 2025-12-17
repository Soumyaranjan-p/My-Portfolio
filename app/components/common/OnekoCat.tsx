import { catConfig } from '@/app/config/Cat';
import Script from 'next/script';


export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  return <Script src="./oneko/oneko.js" data-cat="./oneko/oneko-vaporwave.gif" />;
}
