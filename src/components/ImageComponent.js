import { useState } from 'react';
const ImageComponent = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);


  return (
    <img className='border-green-500 border-2' src={imgSrc} alt={alt} width="120" height="120" />
  );
};

export default ImageComponent;
