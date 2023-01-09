import Layout from "./components/Layout";
import Quiz from "./components/Quiz";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Quiz />
      </Layout>
    </>
  );
}

export default App;
