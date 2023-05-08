import Image from 'next/image';
import React from 'react';

interface ISVGImage {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
}

function SVGImage({ width = 16, height = 16, src, alt = 'svg' }: ISVGImage) {
  return <Image width={width} height={height} src={src} alt={alt} />;
}

export default SVGImage;
