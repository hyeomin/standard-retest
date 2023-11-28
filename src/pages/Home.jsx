import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import shortid from "shortid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/modules/todos";
import styled from "styled-components";

const Home = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const dispatch = useDispatch();

    const onChangeHandler = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "body") {
            setBody(value);
        }
        return;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const newTodo = {
            id: shortid.generate(),
            title,
            body,
            isDone: false,
        };
        if (title.length === 0) {
            alert("할 일을 입력해주세요.");
        } else if (body.length === 0) {
            alert("내용을 입력해주세요.");
        } else {
            dispatch(addTodo(newTodo));
            setTitle("");
            setBody("");
            alert("등록되었습니다.");
        }
    };

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <InputWrapper className="title">
                    <label>할 일:</label>
                    <input
                        name="title"
                        value={title}
                        onChange={onChangeHandler}
                    />
                </InputWrapper>
                <InputWrapper className="content">
                    <label>내용:</label>
                    <input
                        name="body"
                        value={body}
                        onChange={onChangeHandler}
                    />
                </InputWrapper>
                <button type="submit">등록하기</button>
            </Form>
            <div className="card-list">
                <TodoList title={title} body={body} isDone={false} />
                <TodoList title={title} body={body} isDone={true} />
            </div>
        </Container>
    );
};

export default Home;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding: 30px;
    margin: 20px;

    background-color: pink;
    border-radius: 20px;

    width: 400px;

    & button {
        border-color: transparent;

        &:hover {
            transform: scale(1.03);
            cursor: pointer;
        }
    }
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    & input {
        width: 85%;
        border-color: transparent;
    }
`;
