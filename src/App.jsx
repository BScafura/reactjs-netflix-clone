import { useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in.");
        navigate("/");
      } else {
        console.log("No user is signed in.");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <ToastContainer theme="dark"></ToastContainer>
      <Routes>
        <Route path="/" element={<Home></Home>} />\
        <Route path="/login" element={<Login></Login>} />
        <Route path="/player/:id" element={<Player></Player>} />
      </Routes>
    </div>
  );
};

export default App;
