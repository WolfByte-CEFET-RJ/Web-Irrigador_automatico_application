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
  buttonCodecontainer: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginBottom: 10,
    
  },
  boxInput:{
    height: 40,
    width: 40,
    backgroundColor: "#EDF1D6",
    margin:10,
    borderRadius: 8,
    padding:"5%",
    color: "rgba(64,81,59,0.6)",
    borderColor: "#40513B",
    borderWidth: 1,
    fontWeight: "bold",
    alignItems: "center",
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
