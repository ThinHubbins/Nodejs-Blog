import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom'; 

const ERR404 = () => {
  return (
    <div className="err404-container">
      <DotLottieReact
        className="err404-animation"
        src="https://lottie.host/4f9ea682-205f-47af-a10d-39ac13334e4e/8hUOdk6imW.lottie"
        loop
        autoplay
      />
      <Link to="/" className="err404-link">
        Go Home
      </Link>
    </div>
  );
};

export default ERR404;
