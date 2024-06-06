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
  
  view_bars_status: {
    flexDirection: "column",
    alignItems: "center",
  },
  view_horta_text: {
    fontFamily: "Montserrat-Bold",
    marginTop: 10,
  },
  svg: {
    borderRadius: 40, // Defina o borderRadius desejado
    backgroundColor: "#D8E4C2",
  },
  bar_icon: {
    position: "absolute",
    width: 30,
    height: 30,
    top: "5%",
  },
  info_graph: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: -28,
  },
});
