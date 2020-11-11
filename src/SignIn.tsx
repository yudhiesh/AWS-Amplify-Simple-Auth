import React from "react";
import Button from "./Button";
import { styles } from "./Form";

export type TEvent = React.ChangeEvent<HTMLElement>;

const SignIn = ({
  updateFormState,
  signIn
}: {
  updateFormState: (e: TEvent) => void;
  signIn: () => void;
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
      <Button onClick={signIn} title="Sign In" />
    </div>
  );
};

export default SignIn;
