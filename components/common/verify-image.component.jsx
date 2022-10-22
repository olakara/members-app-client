import { config } from '../../shared/constants';
import { useEffect, useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import { isEmptyObject } from '../../shared/utilities';

function VerifyImageComponent({ id, type }) {
  const [imageProps, setProps] = useState({
    width: 400,
    height: 250,
    zoomWidth: 500,
    img: 'https://dummyimage.com/1920x1080&text=loading',
    zoomPosition: 'original',
    class: 'rounded-full',
  });

  useEffect(() => {
    const url = type === 'front' ? 'eidfrontpagedownload' : 'eidlastpagedownload';
    setProps({
      width: 400,
      height: 250,
      zoomWidth: 500,
      img: config.BASE_URL + 'MembershipVerification/' + url + '/' + id,
      zoomPosition: 'original',
      class: 'rounded-full',
    });
  }, [id, type]);

  return <ReactImageZoom {...imageProps} />;
}

export default VerifyImageComponent;
