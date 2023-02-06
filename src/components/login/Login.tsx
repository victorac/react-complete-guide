import { useState } from "react";
import Card from "../ui/Card";
import classes from "./Login.module.css";

interface Props {
  onLogin(email: string, password: string): void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <Card className={`${classes.login}`}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.formControl}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={`${classes.formControl}`}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </Card>
  );
};

export default Login;
