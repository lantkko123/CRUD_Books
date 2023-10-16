import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/books/${bookId}`);
                if (res.data.length > 0) {
                    setBook(res.data[0]);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Update the Book</h1>
            {/* Kiểm tra xem thông tin sách đã được lấy từ API chưa */}
            {book && (
                <>
                    <input
                        type="text"
                        placeholder="Book title"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                    />
                    <textarea
                        rows={5}
                        placeholder="Book desc"
                        name="desc"
                        value={book.desc}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        placeholder="Book price"
                        name="price"
                        value={book.price || ""}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Book cover"
                        name="cover"
                        value={book.cover}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </>
            )}
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;
