import * as Yup from "yup"
import { Form, Formik } from 'formik'
import ApartmentModel, { AddApartmentModel } from '@/models/ApartmentModel'
import TextAreaInput from "@/components/form/TextAreaInput";
import InputNumber from "@/components/form/InputNumber";
import ButtonSubmit from "@/components/form/ButtonSubmit";
import InputField from "@/components/form/InputField";
import ImageInput from "@/components/form/ImageInput";
import { tostifyVariables } from "@/helpers/tostifyVariables";
import toastNotification from "@/helpers/toastNotification";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { goToFunction } from "@/helpers/goToFunction";
import { addApartment, SaveImageApi } from "@/services/apartmentService";




function index() {
  const location =false;


    const intialValues:ApartmentModel = {
        name:"",
        bed:1,
        bathroom:1,
        description:"",
        price:1,
        image: "",
        imageUrl:{} as File,
    }
    const ValidationSchema = Yup.object({
        name:Yup.string().required('Required'),
        description:Yup.string().required('Required'),
        bed:Yup.string().required('Required'),
        price:Yup.number().required('Required'),
        bathroom:Yup.string().required('Required'),
        imageUrl:Yup.mixed().nonNullable().required('Required')
    })
    const onSubmit =async(values:ApartmentModel)=>{
        console.log(values);
        const { imageUrl } = values;
        const imageValue = imageUrl && await SaveImageApi(imageUrl);
        toastNotification({text:`Image Successfully uploaded`,choice:tostifyVariables.success});
        delete values.imageUrl; 
        if(imageValue){
          const model:AddApartmentModel={
            image:imageValue!,
            name:values.name,
            description:values.description,
            bathroom:values.bathroom,
            bed:values.bed,
            price:values.price
          }
          const response = await addApartment(model);
          console.log('response',response)
          if(response) {toastNotification({text:`Apartment Successfully Added`,choice:tostifyVariables.success});
          goToFunction(`/`);
        }
        }
        else{
          toastNotification({text:`Failed in uploading data`,choice:tostifyVariables.error});
        }  
       
    }
  return (
    <div className=' flex flex-col gap-5 min-h-screen justify-center items-center   h-fit py-14 w-[100%]  md:px-[30px]
     overflow-hidden bg-green-100'>

       <div className=' flex w-full pt-8 px-8 text-6xl  text-start bg-transparent  justify-start items-start '>
            <span className=' w-fit cursor-pointer' onClick={()=>goToFunction(`/`)}>
            <IoChevronBackCircleOutline /> </span>
        </div>



    <div className=' uppercase text-black text-center w-[100%]  overflow-hidden lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold'>
      Create Apartment
    </div>

    <Formik onSubmit={onSubmit} initialValues={intialValues} validationSchema={ValidationSchema}
     validateOnChange={false} validateOnBlur={false}>
    {({setFieldValue})=>(
        <Form className=' bg-green-100 py-9 md:px-36 px-8 w-[100%] max-w-[800px]'>
            <div className='flex flex-col gap-7 w-[100%] justify-center items-center text-center'>

          <InputField name='name' placeholder='Name' label='name' />
          <InputNumber   name1='bed' name2='bathroom' title1='beds' title2='bathrooms' />
          { location ?
          <InputNumber   name1='latitude' name2='longitude' title1='latitude' title2='longitude' min2={-180} max2={180} min={-90} max={90}/>
          : null
          }
          <TextAreaInput name='description' placeholder='description' label='description' />
          <InputNumber  name1='price' title1='Regular Price' option={true} />
          <ImageInput name='imageUrl' setFieldValue={setFieldValue}/>
          <ButtonSubmit name='Create Apartment'/>

          </div>
            
        </Form>
    )}
    </Formik>
      
    </div>
  )
}

export default index

