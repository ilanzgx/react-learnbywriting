export default function Header(){
    return (
        <div className="flex bg-blue-700 text-white px-6 py-3">
            <div className="w-1/2 md:w-4/6 flex items-center mx-3">
                <h1 className="text-2xl font-medium">
                    <h1 className=" inline-block text-xl md:text-4xl mb-2 md:mb-0">Learn by </h1> 
                    <span className=" bg-white text-blue-500 rounded px-2 py-1 ml-2">Writing</span>
                </h1>
            </div>

            <div className="w-1/2 md:w-2/6 flex justify-end">
                <button className="bg-white bg-opacity-40 text-xs px-2 py-1 md:px-6 md:py-2 inline-block font-medium rounded mx-1 md:mx-3 my-1">
                    Entrar
                </button>

                <button className="bg-white text-blue-500 text-xs px-2 py-1 md:px-6 md:py-2 inline-block font-medium rounded mx-1 md:mx-3 my-1">
                    Registro
                </button>
            </div>
        </div>
    )
}