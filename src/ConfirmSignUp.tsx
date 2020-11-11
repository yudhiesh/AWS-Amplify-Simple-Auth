import React from "react";
import Button from "./Button";
import { styles } from "./Form";
import { TEvent } from "./SignIn";

const ConfirmSignUp = ({
  updateFormState,
  confirmSignUp
}: {
  updateFormState: (e: TEvent) => void;
  confirmSignUp: () => void;
}) => {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        onChange={(e: TEvent) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <Button onClick={confirmSignUp} title="Confirm Sign Up" />
    </div>
  );
};

export default ConfirmSignUp;
