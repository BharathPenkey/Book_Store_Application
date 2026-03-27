
import React, { useEffect, useState } from "react";
import { getWishlist, toggleWishlist } from "../utils/wishlist";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import book4 from '../assets/book4.png'

const Wishlist = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setBooks(getWishlist());
    }, []);

    const removeItem = (book) => {
        const updated = toggleWishlist(book);
        setBooks(updated);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{
                backgroundImage:`url(${book4})`
                    // "url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')",
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 px-6 pt-6">
                <div className="max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">

                    <Link
                        to="/home"
                        className="flex items-center text-white hover:text-gray-200 gap-2 mb-6"
                    >
                        <FiArrowLeft className="text-lg" />
                        Back
                    </Link>

                    <h1 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3 text-red-400">
                        <FaHeart />
                        My Wishlist
                    </h1>

                    {books.length === 0 ? (
                        <p className="text-center text-white text-lg">
                            No wishlist items yet
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {books.map((book) => (
                                <div
                                    key={book._id}
                                    className="bg-white p-2 rounded-2xl shadow-md overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-1"
                                >

                                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                        <img
                                            src={book.image}
                                            alt={book.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col gap-2">
                                        <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                                            {book.name &&
                                                book.name.charAt(0).toUpperCase() +
                                                book.name.slice(1)}
                                        </h2>

                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {book.author &&
                                                book.author.charAt(0).toUpperCase() +
                                                book.author.slice(1)}
                                        </p>

                                        {book.description && (
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {book.description}
                                            </p>
                                        )}

                                        <button
                                            onClick={() => removeItem(book)}
                                            className="mt-3 bg-red-500 hover:bg-red-600 text-white cursor-pointer py-2 px-4 rounded-lg flex items-center gap-2 transition"
                                        >
                                            <FiTrash2 className="text-white text-lg" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Wishlist;