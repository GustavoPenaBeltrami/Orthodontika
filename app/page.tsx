import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-between w-full h-[calc(100vh-100px)]">
      <img src="/FranjaNaranjaWeb1.png" alt="orange-background" className="w-[100vw] absolute top-0" />
      <img src="/FranjaAzulWeb1.png" alt="orange-background" className="w-[100vw] absolute bottom-0" />
      
      <div className="absolute left-[10vw] translate-y-[-50%] top-1/2">
        <h1 className="text-[#e06417] text-4xl font-bold md:text-6xl">Porque sonreir... <br /> Hace bien!</h1>
        <p className="text-[#3a2c57] my-10 text-lg font-[500] max-w-[80vw] w-[500px] md:text-xl">
          En STS Store, nos especializamos en la venta de productos de instrumentación odontológica profesional, casos completos de los mejores fabricantes internacionales.
        </p>
        <Link href="/productos" className="bg-[#292658] text-white font-bold text-lg md:text-xl hover:bg-[#e06417] transition-all duration-300 px-5 py-2 rounded-md">Ver productos</Link>
      </div>
      
      <img src="/Bracket1Web.png" alt="orange-background" className="bracket-blanco" />
      <img src="/Bracket2Web.png" alt="orange-background" className="bracket-gris" />

    </div>
  );
}
