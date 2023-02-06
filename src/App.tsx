import { useContext } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import AuthContext from "./components/store/AuthProvider";
import Navbar from "./components/ui/Navbar";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div>
      <Navbar>
        <span>Welcome to the App</span>
        {authContext.isLoggedIn && <button onClick={authContext.logoutHandler}>Log out</button>}
      </Navbar>
      {authContext.isLoggedIn ? (
        <Home/>
      ) : (
        <Login/>
      )}
    </div>
  );
}

export default App;
