import React from 'react';
import Nav from "@/component/Nav";
import SecOne from "@/component/SecOne";
import SecTwo from "@/component/SecTwo";
import SecThree from "@/component/SecThree";
import Projects from "@/component/Projects";
import Footer from "@/component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Page() {


  return <>

  <Nav ></Nav>
 <SecOne ></SecOne>
 <SecTwo></SecTwo>
 <SecThree></SecThree>
 <Projects></Projects>

 <Footer></Footer>

 </>
}
