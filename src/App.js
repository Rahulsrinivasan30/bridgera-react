import logo from "./logo.svg";
import "./App.css";
import { bridgera_logo, hide, view } from "./assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveLogin } from "./store/loginData";

function App() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [pwdErr, setPwdErr] = useState("");
  const [show, setShow] = useState(true);

  const onLogin = () => {
    if (name.length < 3 || pwd.length < 3) {
      setNameErr(true);
      setPwdErr(true);
    } else {
      dispatch(
        saveLogin({
          name: name,
          password: pwd,
        })
      );
      navi("/home");
    }
  };

  return (
    <div className="App">
      <div className="login-comp">
        <img src={bridgera_logo} className="logo" alt="Logo" />
        <h2>Login</h2>
        <p className="label">
          Name <span className="err">*</span>
        </p>
        <div className="pos-rel">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your username"
            className={nameErr && name.length < 3 ? "err-outline" : ""}
          />
        </div>
        <p className="label">
          Password <span className="err">*</span>
        </p>
        <div className="pos-rel">
          <input
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type={show ? "password" : "text"}
            placeholder="Enter password"
            className={pwdErr && pwd.length < 3 && "err-outline"}
          />
          <img
            className="icon"
            onClick={() => setShow(!show)}
            src={show ? hide : view}
            alt="icon"
          />
        </div>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
