import React, { useState } from "react";
import { IStyles } from "./Button";
import { Auth } from "aws-amplify";
import SignIn, { TEvent } from "./SignIn";
import SignUp from "./SignUp";
import ConfirmSignUp from "./ConfirmSignUp";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";

export type TInputEvent = React.ChangeEvent<HTMLInputElement>;

interface IIntialState {
  username: string;
  password: string;
  email: string;
  confirmationCode: string;
}

const initialState: IIntialState = {
  username: "",
  password: "",
  email: "",
  confirmationCode: ""
};

const styles: IStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 45,
    marginTop: 8,
    width: 300,
    maxWidth: 300,
    padding: "0px 8px",
    fontSize: 16,
    outline: "none",
    border: "none",
    borderBottom: "2px solid rgba(0, 0, 0, .3)"
  },
  toggleForm: {
    fontWeight: 600,
    padding: "0px 25px",
    marginTop: "15px",
    marginBottom: 0,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)"
  },
  resetPassword: {
    marginTop: "5px"
  },
  anchor: {
    color: "#006bfc",
    cursor: "pointer"
  }
};

type TUpdateFormType = (formType: string) => void;

async function signUp(
  { username, password, email }: IIntialState,
  updateFormType: TUpdateFormType
) {
  try {
    await Auth.signUp({ username, password, attributes: { email } });
    console.log("Sign Up was a success");
    updateFormType("confirmSignUp");
  } catch (error) {
    console.log("Error while signing in!", error);
  }
}
async function confirmSignUp(
  { username, confirmationCode }: IIntialState,
  updateFormType: TUpdateFormType
) {
  try {
    await Auth.confirmSignUp(username, confirmationCode);
    console.log("Sign in was confirmed");
    updateFormType("signIn");
  } catch (error) {
    console.log("Error while confirming sign up!", error);
  }
}
async function signIn({ username, password }: IIntialState, setUser: any) {
  try {
    const user = await Auth.signIn(username, password);
    const userInfo = { username: user.username, ...user.attributes };
    setUser(userInfo);
  } catch (error) {
    console.log("Unable to sign in!", error);
  }
}
async function forgotPassword(
  { username }: IIntialState,
  updateFormType: TUpdateFormType
) {
  try {
    await Auth.forgotPassword(username);
    updateFormType("forgotPasswordSubmit");
  } catch (error) {
    console.log("Error resetting the password", error);
  }
}
async function forgotPasswordSubmit(
  { username, confirmationCode, password }: IIntialState,
  updateFormType: TUpdateFormType
) {
  try {
    await Auth.forgotPasswordSubmit(username, confirmationCode, password);
    updateFormType("signIn");
  } catch (error) {
    console.log("Error while updating password", error);
  }
}

const Form = (props: React.ReactNode) => {
  const [formType, updateFormType] = useState("signIn");
  const [formState, updateFormState] = useState(initialState);

  const updateForm = (event: TInputEvent) => {
    const newFormState = {
      ...formState,
      [event.target.name]: event.target.value
    };
    updateFormState(newFormState);
  };

  function renderForm() {
    return <div>Hello</div>;
  }
  return <div>{renderForm()}</div>;
};

export { styles, Form as default };
