'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import productos from '@/lib/data';

// Create a wrapper component that uses searchParams
const ProductGridWrapper: React.FC = () => {
    const searchParams = useSearchParams();
    return <ProductGrid searchParams={searchParams} />;
};

// Modify ProductGrid to accept searchParams as a prop
const ProductGrid: React.FC<{ searchParams: URLSearchParams }> = ({ searchParams }) => {
    const categoria = searchParams.get('categoria');
    const subcategoria1 = searchParams.get('subcategoria1');
    const subcategoria2 = searchParams.get('subcategoria2');
    const marca = searchParams.get('marca');

    const [filters, setFilters] = useState({
        categoria: categoria || '',
        marca: marca || '',
        subcategoria1: subcategoria1 || '',
        subcategoria2: subcategoria2 || '',
    });

    const [expandedSubcategories, setExpandedSubcategories] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (subcategoria2) {
            const product = productos.find(p => p.subcategoria2 === subcategoria2);
            if (product) {
                setFilters({
                    ...filters,
                    categoria: product.categoria,
                    subcategoria1: product.subcategoria1,
                    subcategoria2: subcategoria2
                });
            }
        } else if (subcategoria1) {
            const product = productos.find(p => p.subcategoria1 === subcategoria1);
            if (product) {
                setFilters({
                    ...filters,
                    categoria: product.categoria,
                    subcategoria1: subcategoria1,
                    subcategoria2: ''
                });
            }
        }
    }, [categoria, subcategoria1, subcategoria2]);

    const getUniqueCategories = () => {
        const categories = new Set(productos.map(product => product.categoria));
        return Array.from(categories);
    };

    const getUniqueBrands = () => {
        const brands = new Set(productos.map(product => product.marca));
        return Array.from(brands);
    };

    const getGroupedSubcategories = (categoria: string) => {
        const subcategoriesMap: { [key: string]: string[] } = {};

        productos.forEach(product => {
            if (product.categoria === categoria) {
                const sub1 = product.subcategoria1;
                const sub2 = product.subcategoria2;

                if (!subcategoriesMap[sub1]) {
                    subcategoriesMap[sub1] = [];
                }
                if (sub2 && !subcategoriesMap[sub1].includes(sub2)) {
                    subcategoriesMap[sub1].push(sub2);
                }
            }
        });

        return subcategoriesMap;
    };

    const filteredProducts = productos.filter(product => {
        return (
            (filters.categoria ? product.categoria === filters.categoria : true) &&
            (filters.marca ? product.marca === filters.marca : true) &&
            (filters.subcategoria1 ? product.subcategoria1 === filters.subcategoria1 : true) &&
            (filters.subcategoria2 ? product.subcategoria2 === filters.subcategoria2 : true)
        );
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
        updateQueryParams({ [name]: value });
    };

    const updateQueryParams = (newParams: { [key: string]: string }) => {
        const currentParams = new URLSearchParams(window.location.search);
        Object.entries(newParams).forEach(([key, value]) => {
            if (value) {
                currentParams.set(key, value);
            } else {
                currentParams.delete(key);
            }
        });
        window.history.replaceState({}, '', `${window.location.pathname}?${currentParams}`);
    };

    const toggleCategory = (categoria: string) => {
        if (filters.categoria === categoria) {
            setFilters(prev => ({
                ...prev,
                categoria: '',
                subcategoria1: '',
                subcategoria2: ''
            }));
            setExpandedSubcategories({});
            updateQueryParams({
                categoria: '',
                subcategoria1: '',
                subcategoria2: ''
            });
        } else {
            setFilters(prev => ({
                ...prev,
                categoria,
                subcategoria1: '',
                subcategoria2: ''
            }));
            setExpandedSubcategories({});
            updateQueryParams({
                categoria,
                subcategoria1: '',
                subcategoria2: ''
            });
        }
    };

    const handleSubcategoria1 = (subcategoria1: string, parentCategoria: string) => {
        if (filters.subcategoria1 === subcategoria1) {
            setFilters(prev => ({
                ...prev,
                subcategoria1: '',
                subcategoria2: ''
            }));
            setExpandedSubcategories(prev => {
                const newState: { [key: string]: boolean } = {};
                Object.keys(prev).forEach(key => {
                    newState[key] = false; // Cerrar todas las subcategorías
                });
                return newState; // Asegurarse de que todas las subcategorías estén cerradas
            });
            updateQueryParams({ subcategoria1: '', subcategoria2: '' });
        } else {
            setFilters(prev => ({
                ...prev,
                categoria: parentCategoria,
                subcategoria1: subcategoria1,
                subcategoria2: ''
            }));
            setExpandedSubcategories(prev => {
                const newState: { [key: string]: boolean } = {};
                Object.keys(prev).forEach(key => {
                    newState[key] = false; // Cerrar todas las subcategorías
                });
                newState[subcategoria1] = true; // Abrir la subcategoría seleccionada
                return newState;
            });
            updateQueryParams({
                categoria: parentCategoria,
                subcategoria1: subcategoria1,
                subcategoria2: ''
            });
        }
    };

    const handleSubcategoria2 = (subcategoria2: string, parentSubcategoria1: string, parentCategoria: string) => {
        if (filters.subcategoria2 === subcategoria2 && filters.subcategoria1 === parentSubcategoria1) {
            // Si la subcategoría 2 ya está seleccionada, la deseleccionamos
            setFilters(prev => ({
                ...prev,
                subcategoria2: ''
            }));
            updateQueryParams({ subcategoria2: '' });
        } else {
            // Si se selecciona una nueva subcategoría 2
            setFilters(prev => {
                // Desmarcar cualquier subcategoria1 que no sea la actual
                const newSubcategoria1 = prev.subcategoria1 === parentSubcategoria1 ? parentSubcategoria1 : '';
                return {
                    ...prev,
                    categoria: parentCategoria,
                    subcategoria1: newSubcategoria1,
                    subcategoria2: subcategoria2
                };
            });
            setExpandedSubcategories(prev => {
                const newState: { [key: string]: boolean } = {};
                // Solo abrir la subcategoría 1 correspondiente
                newState[parentSubcategoria1] = true;
                return newState;
            });
            updateQueryParams({
                categoria: parentCategoria,
                subcategoria1: parentSubcategoria1,
                subcategoria2: subcategoria2
            });
        }
    };

    const toggleSubcategory = (subcategoria1: string) => {
        setExpandedSubcategories(prev => ({
            ...prev,
            [subcategoria1]: !prev[subcategoria1]
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            categoria: '',
            marca: '',
            subcategoria1: '',
            subcategoria2: ''
        });
        setExpandedSubcategories({});
        updateQueryParams({
            categoria: '',
            marca: '',
            subcategoria1: '',
            subcategoria2: ''
        });
    };

    return (
        <div>
            <div className="grid gap-10 mb-4 md:grid-cols-3 grid-cols-2 text-black max-w-[1600px] mx-auto">
                <div className='flex'>
                    <select
                        name="marca"
                        onChange={handleFilterChange}
                        value={filters.marca}
                        className=" border-b border-[#292658] cursor-pointer font-bold text-lg text-[#292658] p-2 h-[50px] w-full focus:outline-none"
                    >
                        <option value="">Marca</option>
                        {getUniqueBrands().map(marca => (
                            <option key={marca} value={marca}>{marca}</option>
                        ))}
                    </select>
                    {filters.marca && ( // Mostrar el botón solo si hay una marca seleccionada
                        <button
                            onClick={() => {
                                const event = new Event('change', { bubbles: true }) as unknown as React.ChangeEvent<HTMLSelectElement>;
                                Object.defineProperty(event, 'target', { value: { name: 'marca', value: '' } });
                                handleFilterChange(event);
                            }} // Restablecer la marca
                            className="text-white bg-[#292658] flex items-center justify-center rounded-md px-3 ml-3 py-1 h-8 mt-5"
                        >
                            X
                        </button>
                    )}
                </div>

                {getUniqueCategories().map(categoria => (
                    <div key={categoria} className=''>
                        <button
                            className={`hover:text-[#df541e] transition-all duration-300 ease-in-out border-b border-[#292658] font-bold text-lg h-[50px] w-full ${filters.categoria === categoria ? 'text-[#df541e]' : 'text-[#292658]'}`}
                            onClick={() => toggleCategory(categoria)}
                        >
                            {categoria}
                        </button>
                        <div className="subcategories">
                            {Object.entries(getGroupedSubcategories(categoria)).map(([subcategoria1, subcategorias2]) => (
                                <div key={subcategoria1} className="mb-2">
                                    <div
                                        className={`cursor-pointer text-md font-bold w-full text-left flex justify-between items-center ${filters.subcategoria1 === subcategoria1 ? 'text-[#df541e]' : 'text-[#292658]'
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubcategoria1(subcategoria1, categoria);
                                        }}
                                    >
                                        <span>{subcategoria1}</span>
                                        {subcategorias2.length > 0 && (
                                            <button
                                                className="ml-2 p-1 focus:outline-none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSubcategory(subcategoria1);
                                                }}
                                            >
                                                <svg
                                                    className={`w-4 h-4 transform transition-transform duration-200 ${expandedSubcategories[subcategoria1] ? 'rotate-180' : ''}`}
                                                    style={{ zIndex: 0 }}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    <div
                                        className={`ml-2 overflow-hidden transition-all duration-200 ease-in-out ${expandedSubcategories[subcategoria1] ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {subcategorias2.map((subcategoria2, index) => (
                                            <button
                                                key={`${subcategoria1}-${subcategoria2}-${index}`}
                                                className={`block text-sm w-full text-left py-1 ${filters.subcategoria2 === subcategoria2 ? 'text-[#df541e]' : 'text-[#292658]'
                                                    }`}
                                                onClick={() => handleSubcategoria2(subcategoria2, subcategoria1, categoria)}
                                            >
                                                {subcategoria2}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {filteredProducts.length === 0 ? (
                <div className="w-full text-center mt-10">
                    <p className="text-2xl text-[#292658] font-bold" >
                        No existen productos con esas características en el catálogo.
                    </p>
                    <button
                        onClick={clearAllFilters}
                        className="text-white bg-[#292658] px-4 py-2 rounded-md mt-4 inline-block font-bold text-lg hover:bg-[#df541e] transition-all duration-200 ease-in-out"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            ) : (
                <div className="flex flex-wrap  justify-center gap-4 max-w-[1600px] mx-auto">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                img: product.img || "/LogoOrthodontika1.png" // Provide a default image URL
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// Export the wrapped component
export default function ProductGridWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductGridWrapper />
        </Suspense>
    );
}