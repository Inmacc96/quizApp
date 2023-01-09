import { Container, Title } from "./styles";

type PropsLayout = {
  children: JSX.Element;
};

const Layout = ({ children }: PropsLayout) => {
  return (
    <Container>
      <Title>Quiz App</Title>

      {children}
    </Container>
  );
};

export default Layout;
