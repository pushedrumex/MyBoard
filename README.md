# MyBoard

## 🛠 기술 스택 🛠

Front : React

Backend : Spring Boot, Mysql, JPA

## ⚙️ 주요 기능 ⚙️

## Main page

1. 게시글 목록
    
    제목 클릭 시, 상세 페이지 이동
    
2. 게시글 작성
    
    게시글 작성 페이지 이동
    

## Detail page

1. 게시글 상세 내용
2. 게시글 수정
    
    비밀번호 확인 후, 수정 페이지 이동
    
3. 게시글 삭제
    
    비밀번호 확인 후, 삭제
    

## Write page

1. 게시 글 작성
    - 작성자
    - 비밀번호
    - 제목
    - 내용
2. 게시글 수정

## API 명세

서버API `localhost:8080`

1. 게시글 전체 목록 - Main
    
    `GET localhost:8080/board`
    
    ```
    [
        {
            id: 1,
            date: '2023-05-17 12:00',
            title: '제목',
            author: '김민정',
        },
        ...
    ]
    ```
    
2. 게시 글 등록 - Write
    
    `POST localhost:8080/posts`
    
    ```
    {
        title: '제목',
        author: '김민정',
        password: '비밀번호',
        content: '내용'
    }
    ```
    
3. 게시글 상세 내용 - Detail, Write
    
    `GET localhost:8080/posts/:id`
    
    ``
    {
        id: 1,
        title: '제목',
        author: '김민정',
        password: '비밀번호',
        content: '내용'
    }
    ```
    
4. 게시판 글 수정 - Write
    
    `PUT localhost:8080/update/:id`
    
    ```
    {
        title: '제목',
        author: '김민정',
        password: '비밀번호',
        content: '내용'
    }
    ```
    
5. 게시판 글 삭제 - Detail
    
    `DELETE localhost:8080/posts/:id`
    
6. 게시판 글 비밀번호 확인
    
    `POST localhost:8080/posts/:id/auth`
    
    ```
    {
        password: 'password'
    }
    ```