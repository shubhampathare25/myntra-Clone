import Header from "../components/Header";
import Footer from "../components/Header";
import HomeItem from "../components/HomeItem";

function App() {


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
