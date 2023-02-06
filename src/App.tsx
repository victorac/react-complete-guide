import { useEffect, useState } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Navbar from "./components/ui/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") == "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email: string, password: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "1");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div>
      <Navbar>
        <span>Welcome to the App</span>
        {isLoggedIn && <button onClick={logoutHandler}>Log out</button>}
      </Navbar>
      {isLoggedIn ? (
        <Home/>
      ) : (
        <Login onLogin={loginHandler} />
      )}
    </div>
  );
}

export default App;
