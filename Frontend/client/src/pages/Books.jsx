import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/books/${id}`);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card">
            <h1>Book Shop</h1>
            <div className="books">
                {books.map((book) => (
                    <div key={book.id} className="book">
                        {/* Sử dụng đường dẫn tương đối để truy cập hình ảnh */}
                        <div className="zoom">
                            <img src={`/img/${book.cover}`} alt="" />
                        </div>
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>$ {book.price}</span>
                        <div className="btn-group">
                            <button className="delete" onClick={() => handleDelete(book.id)}>
                                Delete
                            </button>
                            <button className="update">
                                <Link
                                    to={`/update/${book.id}`}
                                    style={{ color: "inherit", textDecoration: "none" }}
                                    >
                                    Update
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="addHome">
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add New 
                </Link>
            </button>
        </div>
    );
};

export default Books;
