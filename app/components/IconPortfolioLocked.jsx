import React from 'react';

import Image from '../components/FlexibleImage';


const Component = ({ className, x=16.7, y=21.9 }) => {

  return <Image className={className} source={'/site/images/secret.png'} x={x} y={y} />;

};

export default Component;