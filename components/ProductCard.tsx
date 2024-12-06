'use client'
import React from 'react';
import { useCart } from './CartContext';

interface ProductCardProps {
    product: {
        id: string;
        nombre: string;
        precio: number;
        categoria: string;
        subcategoria1: string;
        subcategoria2: string;
        marca: string;
        img: string;
        descripcion?: string;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const cartItem = { ...product, quantity: 1 };
        addToCart(cartItem);
    };

    const handleViewMore = () => {
        const { categoria, subcategoria1, subcategoria2, nombre } = product;
        const url = `/productos/${encodeURIComponent(categoria)}/${encodeURIComponent(subcategoria1)}/${encodeURIComponent(subcategoria2)}/${encodeURIComponent(nombre)}`;
        window.location.href = url;
    };

    return (
        <div className="product-card p-4 rounded-lg transition-all cursor-pointer duration-300 w-full sm:w-[250px] md:w-[280px] lg:w-[300px] hover:scale-105">
            <div className="flex justify-center items-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
                <img 
                    onClick={handleViewMore} 
                    src={product.img || "/LogoOrthodontika1.png"} 
                    alt={product.nombre} 
                    className="w-full max-h-[200px] sm:max-h-[250px] md:max-h-[300px] p-3 sm:p-4 md:p-5 object-contain" 
                />
            </div>
            <h2 onClick={handleViewMore} className="text-xl font-semibold mt-2 text-black">{product.nombre}</h2>
            <p onClick={handleViewMore} className="text-gray-400">{product.categoria} - {product.subcategoria1} - {product.subcategoria2}</p>
            <p onClick={handleViewMore} className="text-gray-800 font-bold mt-1 text-xl">{product.precio} $</p>
            {product.descripcion && <p onClick={handleViewMore} className="text-gray-900 line-clamp-3 mt-1">{product.descripcion}</p>}
            <div className="flex justify-between my-4">
                <button onClick={handleViewMore} className=" bg-[#292658] hover:bg-[#df541e] text-white px-3 py-1 rounded-lg transition-colors duration-200">Ver más</button>
                <button onClick={handleAddToCart} className="bg-[#292658] hover:bg-[#df541e] text-white px-3 py-1 rounded-lg transition-colors duration-200">Añadir al carrito</button>
            </div>
        </div>
    );
};

export default ProductCard;