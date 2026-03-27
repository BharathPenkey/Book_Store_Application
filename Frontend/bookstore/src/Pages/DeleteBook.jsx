import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import book3 from '../assets/book3.png'
import { FiAlertTriangle } from "react-icons/fi";

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [passkey, setPasskey] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async () => {
        // 🔑 Simple passkey check
        if (passkey.trim().toLowerCase() !== "deletebook") {
            setError("Invalid passkey. Contact author.");
            return;
        }

        await axios.delete(`http://localhost:5000/books/${id}`);
        navigate("/home");
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${book3})`
                //   "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da')",
            }}
        >

            <div className="backdrop-blur-xl bg-white/20 border border-white/30 p-8 rounded-3xl shadow-2xl w-[90%] max-w-md text-center">

                <h2 className="text-2xl font-bold text-red-500 mb-4 flex justify-center items-center gap-2">
                    <FiAlertTriangle className="text-red-500" />
                    Delete Book
                </h2>
                <p className="text-white/90 mb-6 text-sm">
                    Enter passkey to confirm deletion
                </p>

                <input
                    type="text"
                    placeholder="Enter passkey..."
                    value={passkey}
                    onChange={(e) => {
                        setPasskey(e.target.value);
                        setError("");
                    }}
                    className="w-full px-4 py-2 mb-3 rounded-lg outline-none border border-white/40 bg-white/30 text-white placeholder-white/70"
                />

                {error && (
                    <p className="text-red-300 text-sm mb-3">{error}</p>
                )}

                <div className="flex justify-center gap-4 mt-4">

                    <button
                        onClick={handleDelete}
                        className="bg-red-500 px-5 py-2 rounded-lg text-white font-semibold hover:scale-105 cursor-pointer transition"
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => navigate("/home")}
                        className="bg-white/30 px-5 py-2 rounded-lg text-white hover:bg-white/40 cursor-pointer transition"
                    >
                        Cancel
                    </button>

                </div>

                <p className="text-xs text-white/70 mt-6">
                    Don’t know passkey? Contact Admin.
                </p>

            </div>
        </div>
    );
};

export default DeleteBook;