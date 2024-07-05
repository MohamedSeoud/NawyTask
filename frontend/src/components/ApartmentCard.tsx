import ApartmentModel from '@/models/ApartmentModel'
import React, { useEffect, useState } from 'react'
import { navigationPath } from '@/helpers/navigationPath';
import calculateDaysPassed from '@/helpers/calculateDaysPassed';
import { goToFunction } from '@/helpers/goToFunction';

function ApartmentCard({model}:{model:ApartmentModel}) {

    const [daysPassed, setDaysPassed] = useState(0);

    useEffect(() => {
        const days = calculateDaysPassed(model.createdAt!);
        setDaysPassed(days);
      }, [model.createdAt]);

  return (
    <div className='w-[100%] h-[100%] max-h-[320px] hover:shadow-2xl rounded-xl transition 
    ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-200
     hover:ease-in cursor-pointer   bg-white'>
        <div className=' w-[100%] h-[100%] flex flex-col ease-out  duration-300'  
        onClick={()=>goToFunction(navigationPath.APARTMENT_DETAILS+`/${model.id}`)}>
        <img  src={model.image} className='w-[100%] h-[180px] rounded-t-xl overflow-hidden' alt={model.name}/>
        <div className=' relative text-white rounded-lg flex justify-center text-center items-center
         bg-blue-500 h-[30px] w-fit px-2 bottom-[165px] mx-3 text-xs font-medium uppercase'>
            {daysPassed} days
        </div>
        </div>
        <div className=' flex justify-start items-start p-3 relative bottom-[140px] flex-col'  >
            {/* <div className='flex justify-between gap-2 flex-row overflow-hidden  '  
            onClick={()=>navigate(navigationPath.APARTMENT_DETAILS+`/${model.id}`)}>
                <span> <MdLocationOn color="green"  size="1.5rem"/></span>
                <span className='line-clamp-1 w-[100%] text-gray-500'>{address}</span>
            </div> */}

            <div className='line-clamp-1 w-[100%]  text-[25px] font-medium text-blue-900 py-1 '  
            onClick={()=>goToFunction(navigationPath.APARTMENT_DETAILS+`/${model.id}`)}>
                {model.description}
            </div>

            <div className='line-clamp-1 w-[100%]  text-[18px] font-normal text-sky-600  '  
            onClick={()=>goToFunction(navigationPath.APARTMENT_DETAILS+`/${model.id}`)}>
                ${model.price}/Month
            </div>

            <div className=' flex flex-row justify-between px-2 w-[100%]'>
            <div className=' flex flex-row gap-x-3 font-bold justify-between '>
             <span>{model.bed} Beds</span>
             <span>{model.bathroom} Baths</span>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ApartmentCard
