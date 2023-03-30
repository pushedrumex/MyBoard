import "./Main.css"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/board')
          .then(response => response.json())
          .then(data => setBoardList(data));
      }, []);
    
    return (
        <div className="board-container">
            <h2 className="board-title">My Board</h2>
            <a href="/write" className="write-button">글 작성</a>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {boardList.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.author}</td>
                        <td>
                        <Link to={`/detail/${item.id}`} className="post-title">
                            {item.title}
                        </Link>
                        </td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                    </tr>
                    ))}
                </tbody>
        </table>
      </div>
      );
    }