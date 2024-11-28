'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import productos from '@/lib/data';
import { useCart } from '@/components/CartContext';

const ProductPage = () => {
    const pathinfo = useParams();

    // Memoize the foundProduct to prevent unnecessary re-renders
    const foundProduct = React.useMemo(() => 
        productos.find(product =>
            product.categoria === decodeURIComponent(pathinfo.categoria as string) &&
            product.subcategoria1 === decodeURIComponent(pathinfo.subcategoria1 as string) &&
            product.subcategoria2 === decodeURIComponent(pathinfo.subcategoria2 as string) &&
            product.nombre === decodeURIComponent(pathinfo.nombre as string)
        ), [pathinfo]
    );

    // Manejo de 404 si no se encuentra el producto
    if (!foundProduct) {
        return (
            <div>
                <h1>404 - Producto no encontrado</h1>
                <p>Lo sentimos, no hemos podido encontrar el producto que buscas.</p>
            </div>
        );
    }

    interface IProduct {
        id: string;
        categoria: string;
        subcategoria1: string;
        subcategoria2: string;
        nombre: string;
        precio: number;
        image: string;
        descripcion?: string;
    }

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const cartItem = { ...foundProduct, quantity: 1 };
        addToCart(cartItem);
    };

    return (
        <>
            <div className="product-detail-container flex flex-row items-center justify-center mt-24 bg-white rounded-lg max-w-4xl mx-auto">
                <img src={foundProduct.img} alt={foundProduct.nombre} className="w-600px object-cover rounded-lg" />
                <div className="product-info flex flex-col ml-4">
                    <h1 className="product-name text-2xl font-bold mb-2">{foundProduct.nombre}</h1>
                        <p className="product-availability text-sm text-gray-600 w-fit italic">{foundProduct.disponibilidad ? 'Disponible' : 'No disponible'}</p>
                    <p className="product-category text-sm text-gray-600 my-2">{foundProduct.categoria} - {foundProduct.subcategoria1} - {foundProduct.subcategoria2}</p>
                    <p className="product-brand text-lg text-gray-900">{foundProduct.marca}</p>
                    {foundProduct.descripcion && <p className="product-description text-gray-900 mt-2 mx-auto w-fit">{foundProduct.descripcion}</p>}
                    <div className="flex flex-row items-center gap-5">

                        <p className="product-price text-3xl mt-2 font-bold mb-4 w-fit">${foundProduct.precio} </p>
                    </div>
                    <button onClick={handleAddToCart} className="bg-[#292658] hover:bg-[#df541e] text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductPage;