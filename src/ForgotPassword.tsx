import React from "react";
import Button from "./Button";
import { styles } from "./Form";
import { TEvent } from "./SignIn";

const ForgotPassword = ({
  updateFormState,
  forgotPassword
}: {
  updateFormState: (e: TEvent) => void;
  forgotPassword: () => void;
}) => {
  return (
    <div style={styles.container}>
      <input
        name="username"
        placeholder="Username"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <Button onClick={forgotPassword} title="Reset Password" />
    </div>
  );
};
export default ForgotPassword;
