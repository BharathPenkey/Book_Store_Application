import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { FaBookOpen, FaUserEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FiSearch, FiBook } from "react-icons/fi";
import homeBookImg from '../assets/homebook.png'

import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/books")
            .then((response) => {
                setBooks(response.data.books);
                setLoading(false);
            })
            .catch(() => setLoading(false));

        const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(saved);
    }, []);

    const toggleWishlist = (book) => {
        let updated;
        if (wishlist.find((item) => item._id === book._id)) {
            updated = wishlist.filter((item) => item._id !== book._id);
        } else {
            updated = [...wishlist, book];
        }
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const filteredBooks = books.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6"
            style={{
                backgroundImage:
                `url(${homeBookImg})`
                    // "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')",
            }}
        >
            <div className="bg-black/60 min-h-screen p-6 rounded-xl">


                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-4xl font-bold text-white tracking-wide flex items-center gap-2">
                        <FiBook className="text-5xl text-blue-400 cursor-pointer" onClick={() => navigate("/")} />
                        Book Showcase
                    </h1>
                    <div className="flex gap-4 items-center flex-wrap">

                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />

                            <input
                                type="text"
                                placeholder="Search books..."
                                className="px-4 py-2 pl-10 rounded-lg w-64 bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <Link to="/wishlist">
                            <button className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 cursor-pointer py-2 rounded-lg shadow-lg transition hover:scale-105">
                                <FaHeart />
                                Wishlist
                            </button>
                        </Link>

                        <Link to="/books/create">
                            <button className="bg-green-500 hover:bg-green-600 cursor-pointer p-2 rounded-full shadow-lg transition hover:scale-110">
                                <MdOutlineAddBox className="text-white text-3xl" />
                            </button>
                        </Link>

                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : filteredBooks.length === 0 ? (
                    <p className="text-white text-center">No books found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                        {filteredBooks.map((book) => {
                            const isWishlisted = wishlist.some(
                                (item) => item._id === book._id
                            );

                            return (
                                <div
                                    key={book._id}
                                    className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2 p-4 flex flex-col"
                                >

                                    <div className="relative">
                                        <img
                                            src={book.image || "https://via.placeholder.com/200"}
                                            alt={book.name}
                                            className="w-full h-52 object-cover rounded-xl"
                                        />

                                        <button
                                            onClick={() => toggleWishlist(book)}
                                            className="absolute top-3 right-3 bg-white p-2 cursor-pointer rounded-full shadow-md hover:scale-110 transition"
                                        >
                                            {isWishlisted ? (
                                                <AiFillHeart className="text-red-500 text-xl" />
                                            ) : (
                                                <AiOutlineHeart className="text-gray-600 text-xl" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-1 flex-grow">
                                        <h2 className="text-lg font-bold text-gray-800 line-clamp-1">

                                            {book.name && book.name.charAt(0).toUpperCase() + book.name.slice(1)}

                                        </h2>

                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <FaUserEdit className="text-gray-400" />

                                            {book.author && book.author.charAt(0).toUpperCase() + book.author.slice(1)}

                                        </p>

                                        {book.price && (
                                            <p className="text-green-600 font-semibold">
                                                ₹{book.price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-between mt-4 pt-3 border-t">

                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className="text-xl text-green-600 hover:scale-110 transition" />
                                        </Link>

                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className="text-xl text-yellow-500 hover:scale-110 transition" />
                                        </Link>

                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className="text-xl text-red-500 hover:scale-110 transition" />
                                        </Link>

                                    </div>
                                </div>
                            );
                        })}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;