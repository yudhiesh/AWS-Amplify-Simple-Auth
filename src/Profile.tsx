import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Auth, Hub } from "aws-amplify";
import Container from "./Container";
import Form, { IIntialState } from "./Form";

function Profile() {
  const [user, setUser] = useState<IIntialState | null>(null);

  useEffect(() => {
    // Need to perform a clean up function when signing out
    let mounted = true;
    checkUser();
    Hub.listen("auth", data => {
      const { payload } = data;
      if (payload.event === "signOut" && mounted) {
        setUser(null);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      console.log(userInfo);
      setUser(userInfo);
    } catch (err) {
      console.log("error: ", err);
    }
  }
  function signOut() {
    Auth.signOut().catch(err => console.log("error signing out: ", err));
  }
  if (user) {
    return (
      <Container>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Email: {user.email}</h3>
        <h4>Phone: {user.phone_number}</h4>
        <Button onClick={signOut}>Sign Out</Button>
      </Container>
    );
  }
  return <Form setUser={setUser} />;
}

export default Profile;
