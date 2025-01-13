import { ImageUpload } from "@/utils/image-upload";
import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db, eq, ProductImage } from "astro:db";
import { getSession } from "auth-astro/server";


export const deleteImage =  defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (imageId, {request}) => {

        const session = await getSession(request);
        const user = session?.user

        if(!user){
            throw new Error(`Unathorized`);
        }


        const [productImage] = await db
            .select()
            .from(ProductImage)
            .where( eq(ProductImage.id, imageId) )

            if(!productImage) {
                throw new Error(`Image with id ${imageId} not found`)
            }

        const deleted = await db
            .delete(ProductImage)
            .where( eq( ProductImage.id, imageId ) )
        //esto es para que no borre las de nuestra carpeta public
        if(productImage.image.includes('http')) {
            await ImageUpload.delete(productImage.image)
        }

        return {ok: true};
    }
})