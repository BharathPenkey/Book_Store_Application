import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { FaBook } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import book6 from '../assets/book6.png'

const CreateBook = () => {
    const [form, setForm] = useState({
        name: "",
        author: "",
        description: "",
        price: "",
        available: true,
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) newErrors.name = "Book name is required";
        if (!form.author.trim()) newErrors.author = "Author is required";
        if (!form.price || form.price <= 0)
            newErrors.price = "Valid price is required";
        if (!file) newErrors.image = "Book image is required";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);

            const imageUrl = await uploadImageToCloudinary(file);

            const payload = {
                ...form,
                image: imageUrl,
            };

            await axios.post(`https://book-store-application-du8n.onrender.com/books`, payload);// http://localhost:5000/books"

            navigate("/home");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
            style={{
                backgroundImage:`url(${book6})`
                    // "url('https://images.unsplash.com/photo-1495446815901-a7297e633e8d')",
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8">

                <Link
                    to="/home"
                    className="flex items-center text-white hover:text-gray-300 gap-2 mb-6"
                >
                    <FiArrowLeft className="text-lg" />
                    Back
                </Link>

                <div className="flex items-center justify-center gap-3 mb-6">
                    <FaBook className="text-yellow-400 text-2xl" />
                    <FaBook className="text-red-500 text-2xl -ml-2" />
                    <FaBook className="text-blue-400 text-2xl -ml-2" />
                    <h1 className="text-3xl font-bold text-white">
                        Add New Book
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <input
                            type="text"
                            placeholder="Book Name *"
                            className="p-3 rounded-lg w-full bg-white/80 focus:outline-none"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Author *"
                            className="p-3 rounded-lg w-full bg-white/80 focus:outline-none"
                            onChange={(e) =>
                                setForm({ ...form, author: e.target.value })
                            }
                        />
                        {errors.author && (
                            <p className="text-red-400 text-sm">{errors.author}</p>
                        )}
                    </div>

                    <textarea
                        placeholder="Description"
                        className="p-3 rounded-lg bg-white/80 focus:outline-none"
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                    />

                    <div>
                        <input
                            type="number"
                            placeholder="Price ₹ *"
                            className="p-3 rounded-lg w-full bg-white/80 focus:outline-none"
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                        />
                        {errors.price && (
                            <p className="text-red-400 text-sm">{errors.price}</p>
                        )}
                    </div>

                    <label className="flex items-center gap-2 text-white">
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) =>
                                setForm({ ...form, available: e.target.checked })
                            }
                        />
                        Available
                    </label>

                    <div>
                        <input
                            type="file"
                            className="p-2 rounded-lg w-full bg-white/80"
                            onChange={(e) => {
                                const selected = e.target.files[0];
                                setFile(selected);
                                setPreview(URL.createObjectURL(selected));
                            }}
                        />
                        {errors.image && (
                            <p className="text-red-400 text-sm">{errors.image}</p>
                        )}
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="h-40 object-cover rounded-lg"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white p-3 rounded-lg hover:scale-105 transition"
                    >
                        {loading ? "Uploading..." : "Create Book"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateBook;