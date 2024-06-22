import React from 'react'
import Image from 'next/image'
import { HiUser } from "react-icons/hi";

function CarListItem({ car, dist }) {
    const scalingFactor = 10;
    return (
        <div className='mt-5 p-5 '>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-5'>
                    <Image src={car.image}
                        width={100} height={100}  alt={car.name}/>
                    <div>
                        <h2 className='font-semibold text-[18px]
                        flex gap-3 items-center'>
                            {car.name}
                            <span className='flex gap-2 font-normal items-center
                            text-[14px]'>
                                <HiUser /> {car.seat}

                            </span>
                        </h2>
                        <p>{car.desc}</p>
                    </div>
                </div>
                <h2 className='font-semibold teext-[18px]'>${(scalingFactor * dist * car.amount).toFixed(2)}</h2>

            </div>
        </div>
    )
}

export default CarListItem