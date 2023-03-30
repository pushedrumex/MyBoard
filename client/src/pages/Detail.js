import { useEffect, useState } from 'react';
import './Detail.css'
import Modal from 'react-modal';
import { useParams, useNavigate } from 'react-router-dom';

export default function Detail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); // 모달창 열림 여부 상태
    const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false); // 모달창 열림 여부 상태

    useEffect(() => {
        fetch(`http://localhost:8080/posts/${id}`)
          .then((res) => res.json())
          .then((data) => setPost(data))
          .catch((error) => console.error(error));
      }, [id]);
    
      if (!post) {
        return <div>Loading...</div>;
      }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
      }

    const checkPassword = (password, id, handlePost) => {
        fetch(`http://localhost:8080/posts/${id}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password}),
        })
        .then(res => res.json())
        .then((data) => {
            if (data) {
                handlePost(id);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
            
        })
        .catch((error) => console.error('Error authenticating post:', error));
        setPassword('');
    }

    const deletePost = (id) => {
        fetch(`http://localhost:8080/posts/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => {
            alert('글이 삭제되었습니다');
            navigate("/");
        })
        .catch((error) => console.error('Error deleting post:', error));
        setDeleteModalIsOpen(false);
    };

    const modifyPost = (id) => {
        navigate(`/write/${id}`);
    };

    return (
        <>
        <div className='detail-container'>
          <h2 className='detail-title'>{post.title}</h2>
          <p className='detail-author'>작성자: {post.author}</p>
          <p className='detail-date'>작성일: {new Date(post.date).toLocaleString()}</p>
          <p className='detail-content'>{post.content}</p>
          <button onClick={() => setModifyModalIsOpen(true)} className='detail-button'>Modify</button>
          <button onClick={() => setDeleteModalIsOpen(true)} className='detail-button'>Delete</button>
        </div>   
        <Modal className="modal" isOpen={deleteModalIsOpen} onRequestClose={() => setDeleteModalIsOpen(false)}>
            <div>
                <div>Delete</div>
                <p className='modal-text'>비밀번호를 입력해주세요.</p>
                <input
                type="password"
                value={password}
                onChange={handlePasswordChange} 
                />
                <button onClick={() => checkPassword(password, post.id, deletePost)}>확인</button>
            </div>
        </Modal>
        <Modal className="modal" isOpen={modifyModalIsOpen} onRequestClose={() => setModifyModalIsOpen(false)}>
            <div>
                <div>Modify</div>
                <p className='modal-text'>비밀번호를 입력해주세요.</p>
                <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                />
                <button onClick={() => checkPassword(password, post.id, modifyPost)}>확인</button>
            </div>
        </Modal>
        </>
      );
}