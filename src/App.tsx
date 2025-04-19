import { ToastContainer } from "react-toastify";
import "./App.css";
import RoutesHandler from "./Pages/Routes/Router";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RoutesHandler />
    </>
  );
}

export default App;
