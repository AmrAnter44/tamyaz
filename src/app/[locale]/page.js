import React from 'react';
import Nav from "./component/Nav";
import SecOne from "./component/SecOne";
import SecTwo from "./component/SecTwo";
import SecThree from "./component/SecThree";
import Projects from "./component/Projects";
import Footer from "./component/Footer";
import Faq from './component/Faq';
import Orbit from './component/Orbit';

export default function Page() {
  return (
    <div className="relative z-10">
      <Nav />
      <Orbit />
      <SecOne />
      <SecTwo />
      <SecThree />
      <Projects />
      <Faq />
      <Footer />
    </div>
  );
}