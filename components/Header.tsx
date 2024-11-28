'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';
import Link from 'next/link';
import Cart from './Cart';

const Header: React.FC = () => {
    const { cartItems } = useCart();
    const [isCartVisible, setCartVisible] = useState(false);
    const cartRef = useRef<HTMLDivElement>(null); // Referencia al componente Cart

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    // Nueva función para manejar clics fuera del carrito
    const handleClickOutside = (event: MouseEvent) => {
        if (
            cartRef.current &&
            isCartVisible &&
            !cartRef.current.contains(event.target as Node) &&
            !((event.target as Element)?.closest('.toggle-cart')) &&
            !((event.target as Element)?.closest('.cart-button'))
        ) {
            setCartVisible(false);
        }
    };
    // Agregar y limpiar el evento de clic
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isCartVisible]);

    return (
        <header className="flex w-[95%] max-w-[1600px] mx-auto items-center py-6 h-[100px]">
            <div className="flex items-center justify-between w-full text-xl font-bold text-[#3a2c57]">
                <Link href="/" className="font-bold">
                    <img src="/LogoOrthodontika1.png" alt="Logo" className="max-w-[500px] w-[90vw]" />
                </Link>

                <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/productos">Productos</Link>

                <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/sobre-nosotros">Sobre nosotros</Link>

                <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/contacto">Contacto</Link>
            </div>

            <div className="fixed right-10 top-5 transition-all duration-300 hover:opacity-80 rounded-full z-50">
                <span onClick={toggleCart} className='bg-[#3a2c57] text-white transition-all duration-300 rounded-full w-6 h-6 flex items-center justify-center absolute top-10 -right-2 cursor-pointer toggle-cart'>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                <button onClick={toggleCart} className="bg-[#df541e] text-white rounded-full p-3 transition-all duration-300 toggle-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="white" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg>
                </button>
            </div>
            <div ref={cartRef}>
                <Cart isVisible={isCartVisible} setIsVisible={setCartVisible} />
            </div>
            <div className='w-[100px]'></div>
        </header>
    );
};

export default Header;