import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface IProps {
  aniName: any;
}

const LottieAni = ({ aniName }: IProps) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      // autoplay: true,
      animationData: aniName,
    });
  }, []);

  return <div ref={container}></div>;
};

export default LottieAni;
