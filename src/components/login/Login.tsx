import { useState, useReducer } from "react";
import Card from "../ui/Card";
import classes from "./Login.module.css";

interface Props {
  onLogin(email: string, password: string): void;
}

type EmailState = {
  value: string;
  isValid?: boolean;
};

type Action = {
  type: string;
  value?: string;
};

const emailReducer = (state: EmailState, action: Action): EmailState => {
  if (action.type === "USER_INPUT") {
    return { value: action.value!, isValid: action.value!.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

type PasswordState = {
  value: string;
  isValid?: boolean;
};

const passwordReducer = (
  state: PasswordState,
  action: Action
): PasswordState => {
  if (action.type === "USER_INPUT") {
    return { value: action.value!, isValid: action.value!.length > 5 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value!.length > 5 };
  }
  return { value: "", isValid: false };
};

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailState, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    dispathEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const emailBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("blur");
    dispathEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
    dispathPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log("blur");
    dispathPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(emailState.value, password);
  };

  return (
    <Card className={`${classes.login}`}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.formControl}`}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={`${emailState.isValid === false ? classes.invalid : ""}`}
          />
        </div>
        <div className={`${classes.formControl}`}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={`${
              passwordState.isValid === false ? classes.invalid : ""
            }`}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </Card>
  );
};

export default Login;
