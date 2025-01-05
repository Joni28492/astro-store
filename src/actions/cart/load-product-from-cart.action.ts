import type { CartItem } from "@/interfaces";
import { defineAction } from "astro:actions"
import { db, eq, inArray, Product, ProductImage } from "astro:db";
import { z } from "astro:schema";


export const loadProductFromCart =  defineAction({
    accept: 'json',
    handler: async (_, {cookies}) => {

        const cart = JSON.parse(cookies.get('cart')?.value ?? '[]' ) as CartItem[];
        if(cart.length===0) return [];
        console.log("action:", cart);
        
        //load producs
        const productIds = cart.map( item => item.productId)
        console.log("filtrado Ids:", productIds);


        const bdProducts = await db
        .select()
        .from(Product)
        .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
        //si se encuentran esos ids en l arr, sin la image
        .where( inArray( Product.id, productIds ) )  

        console.log(bdProducts, "DB Products");

        return cart.map( item => {

            const dbProduct = bdProducts.find(p=> p.Product.id === item.productId)
            if(!dbProduct){
                throw new Error(`Producto with id ${item.productId} not found`)
            }

            const {title,  price, slug} = dbProduct.Product;
            const image = dbProduct.ProductImage.image;
            return {
                productId: item.productId,
                title: title,
                size: item.size,
                quantity: item.quantity,
                image: image.startsWith('http') 
                    ? image
                    : `${import.meta.env.PUBLIC_URL}/images/products/${image}` ,
                price: price,
                slug: slug
            }

        });
    }
})