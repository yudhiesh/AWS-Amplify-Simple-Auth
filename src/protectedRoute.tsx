import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { RouteComponentProps } from "react-router-dom";

interface Props {
  history: string[];
}

const protectedRoute = (
  Comp: React.FunctionComponent<Props>,
  route = "/profile"
) => (props: Props) => {
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      props.history.push(route);
    }
  }
  useEffect(() => {
    checkAuthState();
  }, []);
  return <Comp {...props} />;
};

export default protectedRoute;
