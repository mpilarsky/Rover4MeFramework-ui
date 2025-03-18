import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { loginUser } from "../utils/api";

const useStyles = createUseStyles({
  body: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    background: "linear-gradient(to bottom, #e73348 20%, #811c28cc 80%)",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "url('../assets/background.jpg') center/cover no-repeat",
      opacity: 0.2,
      zIndex: -1,
    },
  },

  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    fontSize: "1.2rem",
  },

  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5rem",

    "&.small": {
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",

      "& .left": {
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",

        "& img": {
          maxWidth: "100%",
          height: "auto",
          maxHeight: "100px",
          borderRadius: "8px",
        },
      },

      "& .center": {
        paddingLeft: "2vw",
        paddingRight: "2vw",
        fontSize: "1.5rem",
      },

      "& .right": {
        display: "flex",
        flexDirection: "row",
        gap: "20px",

        "& button": {
          padding: "10px 20px",
          backgroundColor: "white",
          color: "black",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          fontSize: "1rem",
          transition: "background-color 0.3s ease",

          "&:hover": {
            backgroundColor: "#811C28",
            color: "white",
          },
        },
      },
    },

    "&.large": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
  },

  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",

    "& h2": {
      marginBottom: "20px",
      color: "#811c28",
    },

    "& label": {
      fontSize: "1rem",
      color: "#333",
      marginTop: "10px",
      textAlign: "left",
      width: "100%",
    },

    "& input": {
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "1rem",
    },

    "& button": {
      width: "100%",
      padding: "10px 20px",
      backgroundColor: "#811c28",
      color: "white",
      border: "none",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",

      "&:hover": {
        backgroundColor: "#e73348",
      },
    },
  },

  "@media (max-width: 768px)": {
    rowSmallCenter: {
      padding: "0 5vw",
    },
  },

  "@media (max-width: 480px)": {
    rowSmallCenter: {
      fontSize: "0rem",
    },
  },
});

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    if (success) {
      history.push("/user-dashboard");
    } else {
      alert("Logowanie nieudane");
    }
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.row} small`}>
        <div className="left">
          <Link to="/">
            <img src="public/assets/logo.png" alt="Rover4Me" />
          </Link>
        </div>
        <div className="center">
          <p>Rover4Me to aplikacja, która pozwoli ci na szybkie wynajęcie roweru...</p>
        </div>
        <div className="right">
          <Link to="/signup">
            <button>Rejestracja</button>
          </Link>
        </div>
      </div>
      <div className={`${classes.row} large`}>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <h2>Logowanie</h2>
          <label htmlFor="email">Login:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Zaloguj</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
