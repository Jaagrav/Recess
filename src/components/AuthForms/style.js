export default function styles(theme) {
  return {
    auth: {
      outline: "none",
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    field: {
      width: "100%",
      marginBottom: 20,
    },
    authButton: {
      width: "100%",
      textAlign: "center",
    },
    loginBtn: {
      width: "100%",
    },
    authDivider: {
      textAlign: "center",
      margin: "10px",
    },
    thirdPartyAuths: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
    },
  };
}
