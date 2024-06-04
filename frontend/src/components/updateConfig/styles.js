import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalContent: {
    backgroundColor: "#EDF1D6",
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  input_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },

  iconHorta:{
      position: 'absolute',
      right: '5%',
      top: "5%",
    },

  alert_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  alert_text: {
    fontSize: 15,
    margin:"auto",
  },
});
