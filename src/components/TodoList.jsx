import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, switchTodo } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function TodoList({ title, body, isDone }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    useEffect(() => {
        console.log(todos);
    }, []);

    const onSwitchHandler = (id) => {
        dispatch(switchTodo(id));
    };

    const onDeleteHandler = (id) => {
        const confirmation = window.confirm("삭제하시겠습니까?");
        if (confirmation) dispatch(deleteTodo(id));
        else return;
    };

    const onNavigateDetail = (id) => {
        if (body.length > 0) {
            const confirmation = window.confirm(
                "작성중인 내용이 있습니다. 화면을 이동하시면 사라집니다. 계속하시겠습니까?"
            );
            if (confirmation) navigate(`/${id}`);
        } else {
            navigate(`/${id}`);
        }
    };

    return (
        <Container>
            <h2>{isDone ? "DONE-LIST" : "IN PROGRESS"}</h2>
            {todos
                .filter((item) => {
                    return item.isDone === isDone;
                })
                .map((item) => {
                    return (
                        <CardWrapper className="card-list" key={item.id}>
                            <h2>할 일: {item.title}</h2>
                            <p>내용: {item.body}</p>
                            <ButtonContainer>
                                <button
                                    onClick={() => onSwitchHandler(item.id)}
                                >
                                    {isDone ? "취소" : "완료"}
                                </button>
                                <button
                                    onClick={() => onDeleteHandler(item.id)}
                                >
                                    삭제
                                </button>
                            </ButtonContainer>
                            <DetailButton
                                onClick={() => onNavigateDetail(item.id)}
                            >
                                자세히 보기
                            </DetailButton>
                        </CardWrapper>
                    );
                })}
        </Container>
    );
}

export default TodoList;

const Container = styled.div`
    margin: 20px;

    & h2 {
        background-color: lightblue;
    }
`;

const CardWrapper = styled.div`
    width: 300px;
    padding: 20px;
    border: 1px solid gray;
    border-radius: 20px;
    margin: 10px;

    & h2 {
        margin: 0px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 10px;
    padding: 10px;

    & button {
        width: 100%;
        border-color: transparent;
        background-color: lightblue;

        &:hover {
            transform: scale(1.03);
        }
    }
`;

const DetailButton = styled.button`
    width: 95%;
    border-color: transparent;
    background-color: lightblue;
    margin: 10px;

    &:hover {
        transform: scale(1.03);
    }
`;
