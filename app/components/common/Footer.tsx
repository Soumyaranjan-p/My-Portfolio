
import Container from './Container';
import { footerConfig } from '@/app/config/Footer';

export default function Footer() {
  return (
    <Container className="py-16">
      {/* <div className="flex flex-col items-center justify-center"> */}
      <div className="flex items-center justify-center md:items-start md:justify-start">
        <p className="text-[12px] md:text-[15px] lg:text-[20px] text-[#8E8F8F] dark:text-[#8E8F8F] font-semibold">
           &copy;{' '}{ new Date().getFullYear()} <b>{footerConfig.developer}</b> 
        {/* <p className="text-sm text-secondary text-center">
          {footerConfig.text} <b>{footerConfig.developer}</b> <br /> &copy;{' '}
          {new Date().getFullYear()}. {footerConfig.copyright} */}
        </p>
      </div>
    </Container>
  );
}
