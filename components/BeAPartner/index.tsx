import React from 'react';
// import "./styles.scss";
import { useLocalization } from '../../utils/localization';
import PartnersLogo from '../../images/partners-logo.png';
import FreeFi from '../../images/free.fi.jpg';
import Kinnunen from '../../images/kinnunen.jpeg';
import Link from 'next/link';
import Image from 'next/image';

const BeAPartner = () => {
  const [t, language] = useLocalization();

  return (
    <div className='for-partners-wrapper'>
      <section className='for-partners'>
        <div className='for-partners__description'>
          <div className='for-partners-partner-header'>
            {t('pages.Professionals.partner')}
          </div>
          <div className='for-partners-upper-section'>
            <div className='for-partners-logo-container'>
              <Image
                className='for-partners-logo'
                src={FreeFi}
                alt='partners logo'
              />
              <Image
                className='for-partners-logo'
                src={Kinnunen}
                alt='partners logo'
              />
            </div>

            <div className='for-partners-logo-text'>
              <p>
                {t('pages.Professionals.partnerText1')}
                <a target='_blank' href=' https://free.fi/kevytyrittajyys/'>
                  {' '}
                  {t('pages.Professionals.more')}
                </a>
              </p>

              <p>
                {t('pages.Professionals.partnerText2')}
                <a target='_blank' href='https://www.vakuuttavakinnunen.fi/'>
                  {' '}
                  {t('pages.Professionals.more')}
                </a>
              </p>
            </div>
          </div>
          <div className='for-partners__partner-footer'>
            <div className='for-partners__partner-text'>
              {t('pages.Professionals.partnerText3')}
              <div className='for-partners-button'>
                <Link href='#contact-us'>
                  <button className='for-partners__contact-us-button'>
                    {t('pages.Professionals.action')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeAPartner;
