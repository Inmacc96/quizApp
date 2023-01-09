import styled from "styled-components";
import GlobalStyle from "./styles/global";

const Title = styled.h1`
  color: red;
  border: 1px solid green;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Title>Hola mundo</Title>
      </div>
    </>
  );
}

export default App;
