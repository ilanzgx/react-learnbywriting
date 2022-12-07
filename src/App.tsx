import React, { useState, useEffect } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import axios from 'axios'
import { v4 as uuid } from 'uuid'

export default function App(){

    const [text, setText] = useState<string>("")
    const [selectedText, setSelectedText] = useState<any>([])
    const [textChecked, setTextChecked] = useState<boolean>(false)
    
    const [textWords, setTextWords] = useState<any>([])
    const [textWritedWords, setTextWritedWords] = useState<any>([])
    
    useEffect(() => {
        let currentURL = window.location.href
        axios.get(`${currentURL}/textos.json`).then((response) => {
            let randomNumber = Math.floor(Math.random() * response.data.length)
            setSelectedText(response.data[randomNumber])
        })
    }, [])

    function VerificarTexto(checked: boolean): void {
        setTextChecked(checked)

        let arrayLetters = text.replace(/\n/g, '').split(" ")
        setTextWords(arrayLetters)

        let arrayLetters2 = selectedText.text.replace(/\n/g, '').split(" ")
        setTextWritedWords(arrayLetters2)
    }

    return (
        <div className="bg-white flex flex-col h-screen">
            <Header />
            <div className="mx-6 my-3 md:mx-12 md:my-6 flex-grow">
                <div className="md:flex font-bold uppercase text-xl">
                    <div className="md:w-1/2 px-8 py-3">
                        { !textChecked &&(
                            <p>Texto em português brasileiro</p>
                        )}

                        { textChecked &&(
                            <p>A tradução oficial do texto</p>
                        )}
                    </div>
                    <div className="invisible md:visible md:w-1/2 px-8 py-3">
                        { !textChecked &&(
                            <p>Agora traduza para inglês</p>
                        )}

                        { textChecked &&(
                            <p>O texto que você escreveu</p>
                        )}
                    </div>
                </div>
                <hr />

                { !textChecked && (
                    <div className="md:flex">
                        {/* Texto em português */}
                        <div className="md:w-1/2 flex flex-wrap justify-center text-justify md:px-8 py-3 md:border-r-2">
                            <h1 className="w-full text-xl italic font-medium pb-4 pt-2">{ selectedText.title }</h1>
                            <p>{ selectedText.translation }</p>
                        </div>

                        {/* Texto a ser escrito em inglês */}
                        <div className="md:w-1/2 flex justify-center md:px-8 py-3">
                            <textarea value={text} onChange={(e) => {
                                setText(e.target.value)
                            }} className="w-full form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" lang='en-US' placeholder="Escreva aqui o texto em inglês"></textarea>
                        </div>
                    </div>
                )}

                { textChecked && (
                    <div className="md:flex">
                        {/* Texto em português */}
                        <div className="md:w-1/2 flex flex-wrap justify-center text-justify md:px-8 py-3 md:border-r-2">
                            <h1 className="w-full text-xl italic font-medium pb-4 pt-2">{ selectedText.title }</h1>
                            <p>{ selectedText.text }</p>
                        </div>

                        {/* Texto a ser escrito em inglês */}
                        <div className="md:w-1/2 flex justify-center md:px-8 py-3">
                            <p className='font-medium'>
                                { 
                                    textWords.map((word: any, index: number) => 
                                        <span key={uuid()} style={{ backgroundColor:  (word === textWritedWords[index]) ? 'green' : 'red' }}>
                                            { word + ' ' }
                                        </span>
                                    ) 
                                }
                            </p>
                        </div>
                    </div>
                )}
                <hr />
                <div className="flex justify-center px-8 py-3">
                    { !textChecked && (
                        <button onClick={() => { 
                            VerificarTexto(true)
                        }} type="button" className="block w-5/12 px-6 py-3 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Enviar Texto
                        </button>
                    )}

                    { textChecked && (
                        <button onClick={() => { VerificarTexto(false) }} type="button" className="block w-5/12 px-6 py-3 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out">
                            Editar texto
                        </button>
                    )}
                </div>
                <hr />
            </div>
            <Footer />
        </div>
        
    )
}