import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import Spinner from "../Components/Spinner";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import book5 from '../assets/book5.png'

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        author: "",
        description: "",
        price: "",
        available: true,
        image: "",
    });

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [fetchLoading, setFetchLoading] = useState(true);


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/books/${id}`);
                const book = res.data.book;

                setForm({
                    name: book.name || "",
                    author: book.author || "",
                    description: book.description || "",
                    price: book.price || "",
                    available: book.available ?? true,
                    image: book.image || "",
                });

                setPreview(book.image);
            } catch (err) {
                console.log("Error fetching book:", err);
            } finally {
                setFetchLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const validate = () => {
        let newErrors = {};
        if (!form.name.trim()) newErrors.name = "Book name is required";
        if (!form.author.trim()) newErrors.author = "Author is required";
        if (!form.price || form.price <= 0) newErrors.price = "Valid price required";
        return newErrors;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            setLoading(true);
            let imageUrl = form.image;
            if (file) {
                imageUrl = await uploadImageToCloudinary(file);
            }

            await axios.put(`https://book-store-application-du8n.onrender.com/books/${id}`, { // http://localhost:5000/books/${id}
                ...form,
                price: Number(form.price),
                image: imageUrl,
            });

            navigate("/home");
        } catch (err) {
            console.log("Update error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) return <Spinner />;

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center p-6"
            style={{
                backgroundImage: `url(${book5})`
                //   "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da')",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8">


                <Link to="/home" className="flex items-center text-blue-600 hover:text-blue-800 gap-1 mb-4">
                    <FiArrowLeft className="text-lg" />
                    Back
                </Link>

                <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                    <FiEdit className="text-yellow-500 text-3xl" />
                    Edit Book
                </h1>
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="text"
                            value={form.name || ""}
                            placeholder="Book Name *"
                            className="border p-3 rounded-lg w-full"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={form.author || ""}
                            placeholder="Author *"
                            className="border p-3 rounded-lg w-full"
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                        />
                        {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
                    </div>

                    <textarea
                        value={form.description || ""}
                        placeholder="Description"
                        className="border p-3 rounded-lg"
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />

                    <div>
                        <input
                            type="number"
                            value={form.price || ""}
                            placeholder="Price ₹ *"
                            className="border p-3 rounded-lg w-full"
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.available}
                            onChange={(e) => setForm({ ...form, available: e.target.checked })}
                        />
                        Available
                    </label>

                    <div>
                        <input
                            type="file"
                            className="border p-2 rounded-lg w-full"
                            onChange={(e) => {
                                const selected = e.target.files[0];
                                if (selected) {
                                    setFile(selected);
                                    setPreview(URL.createObjectURL(selected));
                                }
                            }}
                        />
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="h-40 object-cover rounded-lg border shadow"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 cursor-pointer text-white p-3 rounded-lg hover:scale-105 transition"
                    >
                        {loading ? "Updating..." : "Update Book"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;