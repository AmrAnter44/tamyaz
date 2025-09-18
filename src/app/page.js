import React, { Suspense } from 'react';
import Nav from "@/component/Nav";
import SecOne from "@/component/SecOne";
import SecTwo from "@/component/SecTwo";
import SecThree from "@/component/SecThree";
import Projects from "@/component/Projects";
import Footer from "@/component/Footer";
import Faq from '@/component/Faq';

export default async function Page() {
  return <>
    <Nav></Nav>
    <SecOne ></SecOne>
    <SecTwo></SecTwo>
    <SecThree></SecThree>
    <Projects></Projects>
    <Faq></Faq>
    <Footer></Footer>
  </>
}