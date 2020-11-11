import React from "react";
import Button from "./Button";
import { styles } from "./Form";
import { TEvent } from "./SignIn";

const ForgotPasswordSubmit = ({
  updateFormState,
  forgotPasswordSubmit
}: {
  updateFormState: (e: TEvent) => void;
  forgotPasswordSubmit: () => void;
}) => {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        placeholder="ConfirmationCode"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <input
        name="password"
        placeholder="New password"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <Button onClick={forgotPasswordSubmit} title="Save New Password" />
    </div>
  );
};

export default ForgotPasswordSubmit;
