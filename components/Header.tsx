'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartContext';
import Link from 'next/link';
import Cart from './Cart';

const Header: React.FC = () => {
    const { cartItems } = useCart();
    const [isCartVisible, setCartVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <div className="navbar-items-container flex items-center justify-between w-full text-xl font-bold text-[#3a2c57]">
                <Link href="/" className="font-bold">
                    <img src="/LogoOrthodontika1.png" alt="Logo" className="logo-navbar max-w-[500px] w-[90vw]" />
                </Link>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden z-50 p-2 mx-auto"
                >
                    <div className={`md:w-8 md:h-1 w-6 h-[3px] bg-[#3a2c57] mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                    <div className={`md:w-8 md:h-1 w-6 h-[3px] bg-[#3a2c57] mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                    <div className={`md:w-8 md:h-1 w-6 h-[3px] bg-[#3a2c57] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
                </button>

                <div className='menu-items-container hidden lg:flex items-center gap-8 w-full justify-center'>
                    <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/productos">Productos</Link>

                    <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/sobre-nosotros">Sobre nosotros</Link>

                    <Link className="hover:text-[#df541e] transition-all duration-300 text-2xl" href="/contacto">Contacto</Link>
                </div>

                <div className={`fixed inset-0 bg-[#df541e] z-40 lg:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}>
                    <div className="flex flex-col items-center justify-center h-full gap-8">
                        <Link
                            className="text-[#3a2c57] text-4xl font-bold hover:opacity-80 transition-all duration-300"
                            href="/productos"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Productos
                        </Link>
                        <Link
                            className="text-[#3a2c57] text-4xl font-bold hover:opacity-80 transition-all duration-300"
                            href="/sobre-nosotros"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sobre nosotros
                        </Link>
                        <Link
                            className="text-[#3a2c57] text-4xl font-bold hover:opacity-80 transition-all duration-300"
                            href="/contacto"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>

            <div className="carrito-boton fixed right-4 sm:right-10 top-7 sm:top-4 transition-all duration-300 hover:opacity-80 rounded-full z-50">
                <span onClick={toggleCart} className='bg-[#3a2c57] text-white transition-all duration-300 rounded-full w-4 sm:w-6 h-4 sm:h-6 flex items-center justify-center absolute top-7 sm:top-10 -right-1 sm:-right-2 cursor-pointer toggle-cart text-xs sm:text-base'>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                <button onClick={toggleCart} className="bg-[#df541e] text-white rounded-full p-2 sm:p-3 transition-all duration-300 toggle-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="sm:w-[40px] sm:h-[40px] w-[25px] h-[25px]"><path fill="white" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" /></svg>
                </button>
            </div>
            <div ref={cartRef}>
                <Cart isVisible={isCartVisible} setIsVisible={setCartVisible} />
            </div>
            <div className='lg:w-[100px] md:w-[50px] w-[20px]'></div>
        </header>
    );
};

export default Header;