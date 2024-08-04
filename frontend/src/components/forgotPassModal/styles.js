import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalPassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalPassContent: {
    backgroundColor: "#EDF1D6",
    padding: 40,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  Modalmessage: {
    marginTop: 20,
    marginBottom: 40,
    color: "#40513B",
    textAlign: "center",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    fontFamily: "Montserrat-Bold",
  },
  buttonConfirmPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  iconHorta: {
    position: "absolute",
    right: "5%",
    top: "5%",
  },
});
