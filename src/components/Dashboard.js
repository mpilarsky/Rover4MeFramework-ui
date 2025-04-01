import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

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
    backgroundPosition: "fixed",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "url('/assets/background.jpg') center/cover no-repeat",
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
      display: "flex",
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
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
  },

  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    maxWidth: "100%",

    "& img": {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
    },

    "& p": {
      fontWeight: 400,
      color: "#333",
    },

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
    },
  },

  "@media (max-width: 768px)": {
    body: {
      backgroundAttachment: "scroll",
    },

    rowSmallCenter: {
      padding: "0 5vw",
    },

    tile: {
      width: "90%",
    },
  },

  "@media (max-width: 480px)": {
    rowSmallCenter: {
      display: "none",
    },
  },
});

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={`${classes.row} small`}>
        <div className="left">
          <img src="/assets/logo.png" alt="Rover4Me" />
        </div>
        <div className={classes.rowSmallCenter}>
          <p>Rover4Me to aplikacja, która pozwoli ci na szybkie wynajęcie roweru...</p>
        </div>
        <div className="right">
          <Link to="/login"><button>Logowanie</button></Link>
          <Link to="/signup"><button>Rejestracja</button></Link>
        </div>
      </div>
      <div className={`${classes.row} large`}>
        <div className={classes.tile}>
          <img src="/assets/tile1.png" alt="Opis 1" />
          <p>Zarejestruj się</p>
        </div>
        <div className={classes.tile}>
          <img src="/assets/tile2.png" alt="Opis 2" />
          <p>Dokonaj rezerwacji</p>
        </div>
        <div className={classes.tile}>
          <img src="/assets/tile3.png" alt="Opis 3" />
          <p>Śmigaj do celu</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
