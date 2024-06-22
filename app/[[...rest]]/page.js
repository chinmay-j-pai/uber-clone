"use client"
import MapSection from "@/components/MapSection";
import SearchSection from "@/components/SearchSection";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";
import React from "react";

import { SourceLocContext } from "@/context/SourceLocContext";
import { DestLocContext } from "@/context/DestLocContext";
import { MainToggleContext } from "@/context/MainToggleContext";

export default function Home(){
  const [sourceLoc, setSourceLoc] = useState();
  const [destLoc, setDestLoc] = useState();
  const [mainToggle, setMainToggle] = useState(true);

  return(
    <MainToggleContext.Provider value={{mainToggle, setMainToggle}} >
    <SourceLocContext.Provider value = {{sourceLoc, setSourceLoc}} >
    <DestLocContext.Provider value={{destLoc, setDestLoc}}>
    <div>
      <SignedOut>
        Signed out
      </SignedOut>
      <SignedIn>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchSection />

          </div>
          <div className='col-span-2'>

          <MapSection/>
          </div>
        </div>
      </SignedIn>
    </div>
    </DestLocContext.Provider>
    </SourceLocContext.Provider>
    </MainToggleContext.Provider>
  )
}