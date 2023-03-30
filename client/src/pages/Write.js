import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Write.css';

export default function Write() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setPassword(data.password);
        setAuthor(data.author);
        setContent(data.content);
      })
      .catch(error => console.log(error))
    }
  }, [id])

  const modifyPost = (e) => {
    e.preventDefault();

    const post = {id, title, author, password, content, date: new Date()}
    fetch(`http://localhost:8080/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    .then(res => res.json())
    .then(() => {
        alert('수정되었습니다');
        navigate(`/detail/${id}`);
    })
    .catch((error) => console.error('Error updating post:', error));
};


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {title, author, password, content, date: new Date()};
    fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then((res) => res.json())
    .then(() => {
        alert('글이 등록되었습니다.');
        navigate("/");
    })
    .catch((error) => console.log('Error posting : ', error))
  };

  const buttonText = id ? '수정 완료' : '작성 완료';
  const submitHandler = id ? modifyPost : handleSubmit;

  return (
    <div className="write">
      <h2>{id ? '글 수정' : '글 작성'}</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          className="write-input"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="author">작성자</label>
        <input
          type="text"
          id="author"
          className="write-input"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          className="write-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />

        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
}