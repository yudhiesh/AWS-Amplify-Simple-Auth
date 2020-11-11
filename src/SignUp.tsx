import React from "react";
import Button from "./Button";
import { styles } from "./Form";
import { TEvent } from "./SignIn";

const SignUp = ({
  updateFormState,
  signUp
}: {
  updateFormState: (e: TEvent) => void;
  signUp: () => void;
}) => {
  return (
    <div style={styles.container}>
      <input
        name="username"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="Username"
      />
      <input
        name="password"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="Password"
      />
      <input
        name="email"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="Email"
      />
      <Button onClick={signUp} title="Sign Up" />
    </div>
  );
};

export default SignUp;
