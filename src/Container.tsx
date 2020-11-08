import React from "react";

const styles = {
  container: {
    margin: "0 auto",
    padding: "50px 100px"
  }
};

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props): JSX.Element => (
  <div style={styles.container}>{children}</div>
);

export default Container;
