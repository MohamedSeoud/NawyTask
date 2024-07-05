import ApartmentCard from "@/components/ApartmentCard";
import ButtonSubmit from "@/components/form/ButtonSubmit";
import { goToFunction } from "@/helpers/goToFunction";
import { navigationPath } from "@/helpers/navigationPath";
import ApartmentModel from "@/models/ApartmentModel";
import { getApartments } from "@/services/apartmentService";
import { useEffect, useState } from "react";


export default function Home() {

  const [apartments,setApartments] = useState<ApartmentModel[]>();
  const [isLoading,setIsLoading] = useState(true);
  
  useEffect(()=>{
    
    const fetchData= async()=>{
      const apartments = await getApartments();
      console.log('apartments',apartments)
      setApartments(apartments as ApartmentModel[]);
      setIsLoading(false);
    }
    fetchData();
  },[]);

  

  return (
    <>
    { !isLoading ?
    <div className=" bg-green-100 min-h-screen w-full py-10 flex justify-center items-center flex-col xl:px-[200px] lg:px-[120px] md:px-[90px] sm:px-[50px] px-4">
      <div  className=" text-start flex justify-between sm:flex-row  flex-col gap-3 items-center  w-full   py-8">
      <span className="text-3xl font-bold">Apartments</span> 
      
      <span > <ButtonSubmit onClick={()=>goToFunction(navigationPath.ADD_APARTMENT)} name={"Add Apartment"}/> </span>


      </div>
    <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mx-auto w-full ">
      {apartments?.map((item,index) => <ApartmentCard key={index} model={item}/>)}
    </div>
    </div>
    
    
    :<div className=" bg-green-100 flex justify-center items-center w-full h-screen text-center text-xl">
      Loading ........
    </div> }
    
    </>
  );
}
