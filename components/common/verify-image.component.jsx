import { useEffect, useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import { isEmptyObject } from '../../shared/utilities';

function VerifyImageComponent({ props }) {
  const [imageProps, setProps] = useState({
    width: 400,
    height: 250,
    zoomWidth: 500,
    img: 'https://dummyimage.com/1920x1080&text=loading',
    zoomPosition: 'original',
    class: 'rounded-full',
  });

  useEffect(() => {
    console.log(props);
    if (isEmptyObject(props)) return;
    setProps({
      width: 400,
      height: 250,
      zoomWidth: 500,
      img: props.image,
      zoomPosition: 'original',
      class: 'rounded-full',
    });
  }, [props]);

  return <ReactImageZoom {...imageProps} />;
}

export default VerifyImageComponent;
