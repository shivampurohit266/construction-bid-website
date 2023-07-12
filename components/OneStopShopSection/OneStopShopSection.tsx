import React from 'react';
// import "./styles.scss";
import BackgroundImage from '../../images/one-stop-shop.png';
import StopShopOne from '../../images/stop-shop-one.png';
import StopShopTwo from '../../images/stop-shop-two.png';
import StopShopThree from '../../images/stop-shop-three.png';
import StopShopFour from '../../images/stop-shop-four.png';
import { useLocalization } from '../../utils/localization';
import Image from 'next/image';
const OneStopShopSection = () => {
  const [t, language] = useLocalization();
    
  return (
    <div className='stop__shop-container'>
      <div className='stop__shop-background-image' style={{ backgroundImage: `url(${BackgroundImage.src})` }} >
        <div className='stop__shop-text-container'>
          <div className='stop__shop-text'>
            <div className='stop__shop-heading'>
              {t('pages.oneStopShop.title')}
            </div>
            <p className='stop__shop-text--one'>
              {t('pages.oneStopShop.body')}
            </p>
            <p className='stop__shop-text--two'>
              {' '}
              {t('pages.oneStopShop.footer')}
            </p>
          </div>
        </div>

        <div className='stop__shop-images-container'>
          <div className='stop__shop-image--one'>
            <Image src={StopShopOne} alt='input form' />
          </div>
          <div className='stop__shop-image--two'>
            <Image
              src={StopShopTwo}
              alt='cost info and images of household spaces'
            />
          </div>
          <div className='stop__shop-image--three'>
            <Image src={StopShopThree} alt='invoice receipt' />
          </div>
          <div className='stop__shop-image--four'>
            <Image src={StopShopFour} alt='marketplace dashboard' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneStopShopSection;
