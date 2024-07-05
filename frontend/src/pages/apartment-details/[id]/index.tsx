import  { useEffect, useState } from 'react'
import { FaBath, FaBed } from 'react-icons/fa'
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form, Formik } from 'formik'
import { getApartmentById } from '@/services/apartmentService';
import ApartmentModel from '@/models/ApartmentModel';
import Spinner from '@/components/Spinner';
import TextAreaInput from '@/components/form/TextAreaInput';
import ButtonSubmit from '@/components/form/ButtonSubmit';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { goToFunction } from '@/helpers/goToFunction';


function ListingsPage() {
  const[isLoading,setIsLoading]=useState(false)
  const [data,setData] = useState<ApartmentModel>( {} as ApartmentModel);

  const router = useRouter();
  const { id } = router.query;
  
    useEffect(()=>{

    const fetchData = async()=>{
    const data = await getApartmentById(Number(id));
    data && setData(data);
    
    setIsLoading(true)
    }
    fetchData()
  },)

  const initialState={
    message:""
  }

  const validationSchema= Yup.object({
    message:Yup.string().required('Required!')
  }) 

  const onSubmit = async(value:{message:string},{resetForm}:{resetForm:()=>void})=>{
      console.log(value)
      resetForm()
  }



  return (
    <>
     { isLoading ?

     <div className=' flex bg-green-100 flex-col justify-center items-center w-full min-h-screen'>

        <div className=' flex w-full pt-8 px-8 text-6xl  text-start bg-transparent  justify-start items-start '>
            <span className=' w-fit cursor-pointer' onClick={()=>goToFunction(`/`)}>
            <IoChevronBackCircleOutline /> </span>
        </div>

     <Formik initialValues={initialState}  
     onSubmit={onSubmit} validationSchema={validationSchema}
     validateOnChange={false} validateOnBlur={false}
     >
         <Form className=''>
            <div className=' bg-green-100 min-h-screen pb-[75px] '>
              

              <div className=' grid grid-cols-1 lg:grid-cols-2 md:mx-20 mx-6 my-6 gap-8 p-6 shadow-2xl  bg-white rounded-lg  h-fit '>
                  <div className=' col-span-1 flex flex-col md:gap-3 gap-1 h-fit'>
                      <div className=' text-blue-800 font-bold md:text-2xl text-lg py-3'>
                          {data.name}-{data.price}$/month
                      </div>





                    <div className='flex justify-between gap-2 md:text-xl text-md  text-black flex-row overflow-hidden '>
                      <span className=' w-[100%]  line-clamp-6 '> <span className=' font-bold '>Description</span> : 
                        {data.description}
                      </span>
                    </div>  


                    
                    <div className='flex justify-between gap-2 md:text-xl text-md py-4 font-bold flex-row overflow-hidden '>
                          <span> <FaBed color="black"  size="1.5rem"/></span>
                      <span className=' w-[100%] text-gray-500'>{data.bed} Beds  </span>

                      <span> <FaBath color="black"  size="1.5rem"/></span>
                      <span className=' w-[100%] text-gray-500'>{data.bathroom} Baths  </span>


                    </div>



                      <div className=' font-medium text-gray-500  md:text-xl text-md'> Contact The Owner for the family home in central!</div>
                    <TextAreaInput name='message' placeholder='Message' className=' border-[2px] border-gray-300 p-4
                     rounded-xl text-xl font-medium
                     '/>
                     <ButtonSubmit name='Send Message'/>

                  </div>
                  
                  <div className=' w-full h-full flex justify-center items-center'>
                    <img src={data.image} alt='' className=' w-full h-full'/>


                  </div>


              </div>
            
            </div>
          </Form>
      </Formik>
      </div>
      :
      <Spinner/> 
    }
    </>
  )
}

export default ListingsPage
