import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import '../App.css';

const Loader = () => {
  return (
    <div className="loader-screen">
      <DotLottieReact
      src="https://lottie.host/17e04ee3-3a29-4699-890e-f88f83218af6/kmFgScbid1.lottie"
      loop
      autoplay
    />
    </div>
  );
};

export default Loader;
