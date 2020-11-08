import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import Container from "./Container";

interface Props {
  history: string[];
}

const Protected = (props: Props) => {
  useEffect(() => {
    Auth.currentAuthenticatedUser().catch(() => props.history.push("/profile"));
  }, []);
  return (
    <Container>
      <h1>Protected routes</h1>
    </Container>
  );
};

export default Protected;
