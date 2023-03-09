import React, { useEffect, useState, useRef } from "react";

// Router
import { useParams } from "react-router-dom";

// Get Product
import { getProductById , currency } from "home/products";

// addtocart
import placeAddToCart from 'addtocart/placeAddToCart'

const PDPContent = () => {

    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const addToCart = useRef(null);

    useEffect(() => {
        if (id) {
            getProductById(id).then(setProduct);
        } else {
            setProduct(null);
        }
    }, []);

    useEffect(() => {
        if (addToCart.current) {
            placeAddToCart(addToCart.current, product.id);
        }
    }, [product]);

    if (!product) return null;

    return (<div className="grid grid-cols-2 gap-5">
        <div>
            <img src={product.image} alt={product.name} />
        </div>
        <div>
            <div className="flex">
                <h1 className="font-bold text-3xl flex-grow">
                    { product.name }
                </h1>
                <div className="font-bold text-3xl flex-end">
                    { currency.format(product.price) }
                </div>
            </div>
            <div ref={addToCart}></div>
            <div className="mt-10">
                { product.description }
            </div>
            <div className="mt-10">
                { product.longDescription }
            </div>
        </div>
    </div>);
};

export default PDPContent;