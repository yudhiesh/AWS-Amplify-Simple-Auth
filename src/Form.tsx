import React, { useState } from "react";
import { IStyles } from "./Button";
import { Auth } from "aws-amplify";
import SignIn, { TEvent } from "./SignIn";
import SignUp from "./SignUp";
import ConfirmSignUp from "./ConfirmSignUp";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordSubmit from "./ForgotPasswordSubmit";

export type TInputEvent = React.ChangeEvent<HTMLInputElement>;
type TUpdateFormType = (formType: string) => void;

export interface IIntialState {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  confirmationCode: string;
}

export interface IUserState {
  email: string;
  email_verified: boolean;
  sub: string;
  username: string;
}

const initialState: IIntialState = {
  username: "",
  password: "",
  email: "",
  phone_number: "",
  confirmationCode: ""
};

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
async function signIn(
  { username, password }: IIntialState,
  setUser: (user: React.SetStateAction<IUserState | null>) => void
) {
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

const Form = (props: any) => {
  const [formType, updateFormType] = useState("signIn");
  const [formState, updateFormState] = useState(initialState);
  const updateForm = (event: TEvent) => {
    const target = event.target as HTMLInputElement;
    const newFormState = {
      ...formState,
      [target.name]: target.value
    };
    updateFormState(newFormState);
  };

  function renderForm() {
    switch (formType) {
      case "signUp":
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={(e: TEvent) => updateForm(e)}
          />
        );
      case "confirmSignUp":
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={(e: TEvent) => updateForm(e)}
          />
        );
      case "signIn":
        return (
          <SignIn
            signIn={() => signIn(formState, props?.setUser)}
            updateFormState={(e: TEvent) => updateForm(e)}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPassword
            forgotPassword={() => forgotPassword(formState, updateFormType)}
            updateFormState={(e: TEvent) => updateForm(e)}
          />
        );
      case "forgotPasswordSubmit":
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() =>
              forgotPasswordSubmit(formState, updateFormType)
            }
            updateFormState={(e: TEvent) => updateForm(e)}
          />
        );
      default:
        return null;
    }
  }
  return (
    <div>
      {renderForm()}
      {formType === "signUp" && (
        <p style={styles.toggleForm}>
          Already have an account?{" "}
          <span style={styles.anchor} onClick={() => updateFormType("signIn")}>
            Sign In
          </span>
        </p>
      )}
      {formType === "signIn" && (
        <>
          <p style={styles.toggleForm}>
            Need an account?{" "}
            <span
              style={styles.anchor}
              onClick={() => updateFormType("signUp")}
            >
              Sign Up
            </span>
          </p>
          <p style={{ ...styles.toggleForm, ...styles.resetPassword }}>
            Forget your password?{" "}
            <span
              style={styles.anchor}
              onClick={() => updateFormType("forgotPassword")}
            >
              Reset Password
            </span>
          </p>
        </>
      )}
    </div>
  );
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

export { styles, Form as default };
