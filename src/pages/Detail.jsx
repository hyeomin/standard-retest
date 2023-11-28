import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Detail = () => {
    const param = useParams();
    const todos = useSelector((state) => state.todos);

    const data = todos.find((item) => item.id == param.id);

    return (
        <Container className="container">
            <h3>할 일: {data.title}</h3>
            <p>내용: {data.body}</p>
            <p>현재 상태: {data.isDone ? "완료" : "진행 중"}</p>
        </Container>
    );
};

export default Detail;

const Container = styled.div`
    width: 400px;
    background-color: lightpink;
    border: 1px solid gray;
    border-radius: 20px;
    padding: 30px;

    & h3,
    p {
        background-color: white;
        border-radius: 10px;
        padding: 10px 20px;
    }
`;
