import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Container from "./Container";

interface User {
  username: string;
  email: string;
  phone_number: string;
}

const Profile = () => {
  const [user, setUser] = useState({} as User);
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Phone: {user.phone_number}</h2>
      <AmplifySignOut />
    </Container>
  );
};
export default withAuthenticator(Profile);
