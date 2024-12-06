'use client'
import React, { useContext, useEffect, useState } from "react";
import { useCart } from './CartContext';
import ProductCard from './ProductCard';

const Cart: React.FC<{ isVisible: boolean, setIsVisible: (visible: boolean) => void }> = ({ isVisible, setIsVisible }) => {
    const { cartItems, removeFromCart, handleQuantityChange } = useCart();
    const [message, setMessage] = useState("");
    const phoneNumber = "5493513283779";

    const generarMensaje = () => {
        let mensaje = "Hola, te hablo para hacerte un pedido desde la web:\n\n";
        cartItems.forEach((item) => {
            mensaje += `${item.quantity}x ${item.nombre}\n`;
        });
        mensaje += "\nMuchas Gracias!";
        setMessage(mensaje);
    };

    const handleClick = () => {
        generarMensaje();
        const urlMessage = encodeURIComponent(message); // Mensaje codificado para la URL
        const whatsappURL = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${urlMessage}&app_absent=0`;
        window.open(whatsappURL, "_blank");
    };
    useEffect(() => {
        if (isVisible) {
            generarMensaje(); // Generar mensaje cuando el carrito es visible
        }
    }, [isVisible, cartItems]);

    const handleCartClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Evita que el clic se propague al documento
    };

    return (
        <div onClick={handleCartClick} className={`text-black cart fixed right-0 top-0 bg-white shadow-lg p-4 h-full transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'} duration-300 z-[99999]`}>
            <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-xl text-[#3a2c57] hover:text-[#df541e] transition-all duration-300">✖</button> {/* Cruz para cerrar */}
            <h2 className="text-2xl font-bold mb-4 mt-6">Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul className="overflow-y-scroll max-h-[400px] border p-3 rounded-lg border-[#292658]">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-2">
                            <p className="pr-5">{item.nombre}</p>
                            <div className="flex items-center">
                                <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, item.quantity - 1); }} className="cart-button bg-[#3a2c57] text-white px-2 py-1 rounded-l hover:bg-[#df541e] transition-all duration-300" disabled={item.quantity <= 1}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.id, item.quantity + 1); }} className="cart-button bg-[#3a2c57] text-white px-2 py-1 rounded-r hover:bg-[#df541e] transition-all duration-300">+</button>
                                <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} className="cart-button ml-2 bg-[#df541e] text-white px-2 py-1 rounded hover:bg-[#3a2c57] transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></button>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="mt-4">
                    <button onClick={handleClick} className="bg-green-500 flex items-center gap-4 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="white" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
                        <span className="text-lg">Haz tu pedido!</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;