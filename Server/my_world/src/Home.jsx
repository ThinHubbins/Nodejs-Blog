import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import About from "./About";
import collage from "./assets/collage.png";
import catsurname from "./assets/gif/cat1.gif";
import dogy from "./assets/gif/dogy.gif";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
 useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true, // better performance
  });

  gsap.fromTo(
    ".netpage",
    { clipPath: "inset(0% 100% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: () => {
          AOS.refresh();
        },
      },
    }
  );
}, []);


  return (
    <>
      <section className="scroll-section">
        <div className="sticky-layer">
          <div className="container">
            {/* Base page */}
            <div className="base-page">
              <div className="row hero-div align-items-center">
                <div className="col-md-6">
                  <div className="surname">
                    <h1 className="name cat">CHINWEZE FREDRICK</h1>
                    <img src={catsurname} alt="cat" className="cat" />
                  </div>
                  <div className="subhero my-3">
                    REACT<span className="fullstop"></span>DEVELOPER
                  </div>
                  <div className="copyright mt-4 text-center">
                    ©2025
                    <div className="copy"></div>
                    <div className="copy"></div>
                    <div className="copy"></div>
                  </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center align-items-center collage">
                  <img
                    src={collage}
                    alt="collage"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Scrolling text section */}
            <div className="netpage mt-5 text-center">
              <div className="hello text-black">"Hello World"</div>
              <div className="container vh-100 d-flex justify-content-center align-items-center text-center">
                
                <div className="boxcon d-flex justify-content-center align-items-center">
                  <div className="boxin dogy ">
                    <div className="boxtext p-4 text-center" data-aos="fade-up"
     data-aos-duration="3000">
                      React.js developer skilled in JavaScript, experienced with
                      Bootstrap, headless CMS integration, and Git/GitHub for
                      team collaboration. Focused on building clean, responsive
                      and reliable frontend applications.
                    </div>
                  </div>
                  <img src={dogy} alt="dogy" className="dogy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About />
    </>
  );
};

export default App;
