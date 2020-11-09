import React from "react";

export default function Button({
  onClick,
  title
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
}) {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}

// Forces a nested style to be a CSSProperties
interface StyleButton {
  [Key: string]: React.CSSProperties;
}

const styles: StyleButton = {
  button: {
    backgroundColor: "#006bfc",
    color: "white",
    width: 316,
    height: 45,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    outline: "none",
    borderRadius: 3,
    marginTop: "25px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, .3)"
  }
};
