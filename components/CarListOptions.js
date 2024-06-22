import { CarListData } from '@/utils/CarListData'
import React, { useState, Suspense } from 'react'
import CarListItem from './CarListItem'
import Loading from "@/app/loading";
import Buy from './Buy';

function CarListOptions({dist}) {
    const [activeIndex, setActiveIndex] = useState();
    const [selectedCar, setSelectedCar] = useState([]);

  return (
    <div className='mt-5 overflow-auto h-[250px]'>
        <h2 className='text-[22px] font-bold'> Recommended</h2>
        {CarListData.map((item, index) =>(
            <div className={`cursor-pointer p-2 px-4 rounded-md
            border-black 
            ${activeIndex==index?'border-[3px]':null}`}
            onClick={() => {
              setActiveIndex(index);
              setSelectedCar(item)}}
            >
                <CarListItem car={item} dist={dist}/>
            </div>
        ))}

        {selectedCar.name ?<div className='flex justify-between fixed 
        bottom-5 bg-white p-3 shadow-xl rounded-lg
        w-full md:w-[30%] border-[1px] items-center'>
          <h2>Make Payment For</h2>
          <Suspense fallback={<Loading />}>
                <Buy carName={selectedCar.name}/>
            </Suspense>
        </div> : null}
    </div>
  )
}

export default CarListOptions