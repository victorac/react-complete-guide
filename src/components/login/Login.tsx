import { useState, useReducer, useEffect, useContext, useRef } from "react";
import AuthContext from "../store/AuthProvider";
import Card from "../ui/Card";
import Input from "../ui/Input";
import classes from "./Login.module.css";

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

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [emailState, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;
  useEffect(() => {
    const interval = setTimeout(() => {
      setIsFormValid((emailValid ?? false) && (passwordValid ?? false));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [emailValid, passwordValid]);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispathEmail({ type: "USER_INPUT", value: event.target.value.trim() });
  };

  const emailBlurHandler = () => {
    dispathEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispathPassword({ type: "USER_INPUT", value: event.target.value.trim() });
  };

  const passwordBlurHandler = () => {
    dispathPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      if (!emailState.isValid) {
        emailRef.current?.focus();
      } else {
        passwordRef.current?.focus();
      }
    } else {
      authContext.loginHandler(emailState.value, passwordState.value);
    }
  };

  return (
    <Card className={`${classes.login}`}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          className={`${classes.formControl}`}
          id="email"
          label="Email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          inputClassName={`${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        />
        <Input
          ref={passwordRef}
          className={`${classes.formControl}`}
          id="password"
          label="Password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          inputClassName={`${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        />
        <button type="submit">Log in</button>
      </form>
    </Card>
  );
};

export default Login;
