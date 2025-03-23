import React, { Suspense } from 'react';
import Nav from "@/component/Nav";
import SecOne from "@/component/SecOne";
import SecTwo from "@/component/SecTwo";
import SecThree from "@/component/SecThree";
import Projects from "@/component/Projects";
import Footer from "@/component/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic';
import Loading from '@/app/Loading';

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function Page() {
  await delay(2000);


  return <>


  <Nav></Nav>
 <SecOne ></SecOne>
 <SecTwo></SecTwo>
 <SecThree></SecThree>
 <Projects></Projects>
 <Footer></Footer>


 </>
}
