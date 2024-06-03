import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        height: "8vh",
        fontSize: "12px",
        backgroundColor: "#e9e9e9",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span> Note: Again click on Parse if some fields disapper</span>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "15px",
        }}
      >
        <span
          style={{
            border: "none",
            color: "black",
            cursor: "pointer",
            marginRight: "30px",
            marginTop: "10px",
          }}
        >
          Made with ❤️ by Srivasanth Jammula
        </span>
        <FaGithub
          size={20}
          onClick={() => window.open("https://github.com/srivasanth23")}
        />
      </div>
    </div>
  );
};

export default Footer;
