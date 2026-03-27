import React from "react";
import { useNavigate } from "react-router-dom";
import landingBackgroundImg from '../assets/landingBook.png'
import { FaBookOpen } from "react-icons/fa";

const LandingPage = () => {
    const navigate = useNavigate();

    return (

        <div className="relative h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    `url(${landingBackgroundImg})`
                // "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')",
            }}
        >

            {/* CONTENT */}
            <div className="flex items-center justify-center h-full px-4">

                <div className="backdrop-blur-xs bg-white/20 border border-white/30 px-10 py-12 rounded-3xl shadow-2xl text-center max-w-2xl">

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-amber-400 drop-shadow-md flex items-center justify-center gap-3">
                        <FaBookOpen className="text-amber-400" />
                        Welcome to Literary Hub
                    </h1>

                    <p className="text-lg md:text-xl mb-8 text-amber-100 leading-relaxed
              max-w-3xl mx-auto text-center drop-shadow-lg">
                        Explore a world of knowledge, discover amazing books, build your personal collection and fuel your love for reading.
                    </p>
                    <button
                        className="bg-white text-gray-800 cursor-pointer px-6 py-3 rounded-full font-semibold shadow-md 
             hover:bg-pink-900 hover:text-white transition-colors duration-300 transform hover:scale-110"
                        onClick={() => navigate("/home")}
                    >
                        Explore Books
                    </button>

                </div>

            </div>
        </div>
    );
};

export default LandingPage;