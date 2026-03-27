import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import homebook from '../assets/homebook.png'

const Showbook = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`https://book-store-application-du8n.onrender.com/books/${id}`)
            // .get(`http://localhost:5000/books/${id}`)
            .then((res) => {
                const bookdetails = res.data.book || res.data; // fallback
                setBook(bookdetails);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex justify-center items-start p-6"
            style={{
                backgroundImage: `url(${homebook})`
                //   "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da')",
            }}
        >

            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 max-w-3xl w-full">

                <Link
                    to="/home"
                    className="flex items-center text-white hover:text-gray-300 gap-2 mb-6"
                >
                    <FiArrowLeft className="text-lg" />
                    Back
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl w-full p-6 md:p-10 flex flex-col md:flex-row gap-6 transition hover:shadow-3xl">

                    <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-4 text-gray-800">

                        <h1 className="text-3xl md:text-4xl font-bold">
                            {book.name &&
                                book.name.charAt(0).toUpperCase() + book.name.slice(1)}
                        </h1>

                        <p className="flex items-center gap-2 text-lg text-gray-600">
                            <FaUserEdit className="text-yellow-500" />
                            {book.author &&
                                book.author.charAt(0).toUpperCase() + book.author.slice(1)}
                        </p>

                        {book.description && (
                            <p className="text-gray-700 text-base md:text-lg mt-2 line-clamp-5">
                                {book.description}
                            </p>
                        )}

                        {book.price && (
                            <p className="text-xl font-semibold text-orange-600 mt-2">
                                Price: ₹{book.price}
                            </p>
                        )}

                        <p className="mt-2">
                            {book.available ? (
                                <span className="text-green-600 font-semibold">Available</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Available</span>
                            )}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showbook;