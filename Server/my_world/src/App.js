import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import About from "./About";
import Loader from "./components/loading";
import { useState, useEffect } from "react";
import ERR404 from "./components/Err404";

function App() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // simulate loading (e.g., API fetch)
    const timer = setTimeout(() => setLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loader) return <Loader />;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {" "}
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />{" "}
          <Route path="/about" element={<About />} />{" "}
          <Route path="/*" element={<ERR404 />} />{" "}
        </Routes>{" "}
      </main>
    </>
  );
}

export default App;
