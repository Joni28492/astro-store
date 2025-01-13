import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db, eq, Product, ProductImage } from "astro:db";


const newProduct = {
    id:'',
    description: 'Nueva Descripcion',
    gender: 'men',
    price: 100,
    sizes: 'XS,S',
    stock: 5,
    slug: 'nuevo-producto',
    tags: 'shirt,men,nuevo',
    title: 'Nuevo Producto',
    type: 'shirts',
    user: '',
}


export const getProductsBySlug =  defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (slug) => {

        if(slug=== 'new'){
            return {
                product: newProduct,
                images: []
            }
        }



        const [product] = await db
            .select()
            .from(Product)
            .where( eq( Product.slug, slug ) )

        if(!product) {
            throw new Error(`Product whit slug ${slug} not found`)
        }

        const images = await db
            .select()
            .from(ProductImage)
            .where( eq( ProductImage.productId, product.id ) )


        return  {
            product: product,
            images: images,
            // images: images.map( i => i.image),
        } ;
    }
})