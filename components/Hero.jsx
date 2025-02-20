'use client'

import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
const Hero = () => {

   const imageRef = useRef();
   useEffect(()=>{
      const imageElement = imageRef.current;
      function handleScroll(){
         const scrollPosition = window.scrollY;
         const scrollThreshold = 100;
         if(scrollPosition > scrollThreshold) imageElement.classList.add("scrolled");
         else imageElement.classList.remove("scrolled")
      }
      window.addEventListener("scroll",handleScroll)

      return () => window.removeEventListener("scroll",handleScroll)
   },[])
  return (
    <div className="pb-20 ">
        <div className="container mx-auto text-center">
             <h1 className="text-5xl md:text-8xl lg:text-[130px] pb-6 gradient-title">
              Manage Your Finances <br /> with Intelligence
             </h1>
             
             <div className="flex gap-2 mb-3 mt-10 justify-center">
                <Link href="/dashboard">
                 <Button 
                 siz="lg" 
                 className="px-8" >
                    Get Started
                 </Button>
                 </Link>
                 <Link href="/">
                 <Button siz="lg" 
                 variant="outline" className="px-8" >
                    Watch Demo
                 </Button>
                 </Link>
             </div>
             <div className="hero-image-wrapper">
                <div 
                className="hero-image"
                ref={imageRef}
                >
                    <Image
                    src="/banner.jpeg"
                    width={1280}
                    height={720}
                    alt="Dashboard Preview"
                    className="rounded-lg shadow-2xl border mx-auto"
                    priority
                    />
                </div>
             </div>
        </div>      
    </div>
  )
}

export default Hero
