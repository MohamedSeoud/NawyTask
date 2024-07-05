import  { AddApartmentModel } from "@/models/ApartmentModel";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';


export async function getApartments() {
    try{
        const response = await axios.get(`${apiUrl}/apartments`);
        return response.data.reverse();
    }
    catch(error)
    {
        console.log('error during fetching data',error)
    }
}

export async function getApartmentById(id:number) {
    try{
        const response = await axios.get(`${apiUrl}/apartments/${id}`);
        return response.data;
    }
    catch(error)
    {
        console.log('error during fetching data',error)
    }

}

export async function addApartment(model:AddApartmentModel) {
    try{
        const response = await axios.post(`${apiUrl}/apartments`,model);
        return response.data;
    }
    catch(error)
    {
        console.log('error during fetching data',error)
    }

}



export async function SaveImageApi(imageFile:File) {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: "d08e263096600adf643aa08b5e501caa",
      },
    });

    console.log('Response:', response.data);
    const imageUrl = response.data.data.url;
    console.log('Uploaded Image URL:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image to ImgBB:', (error as {message:string}).message);
    return null;
  }
}




