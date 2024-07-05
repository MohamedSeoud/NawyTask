

export default interface ApartmentModel{
    id?:number ,
    name:string,
    description:string,
    bed:number ,
    bathroom:number ,
    price:number ,
    image:string,
    imageUrl?:File,
    createdAt?:string,
}


export interface AddApartmentModel{
    name:string,
    description:string,
    bed:number ,
    bathroom:number ,
    price:number ,
    image:string,
}
