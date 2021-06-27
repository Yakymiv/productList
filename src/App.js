import MainPage from "./components/main/mainPage";
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'

function App({ fruits }) {
  console.log(fruits);
  return (
    <MainPage></MainPage>
  );
}

export default App;
