import React, { useEffect } from "react";
import Container from "./Container";
import protectedRoute from "./protectedRoute";

const Protected = () => {
  return <Container>Protected</Container>;
};

export default protectedRoute(Protected);
