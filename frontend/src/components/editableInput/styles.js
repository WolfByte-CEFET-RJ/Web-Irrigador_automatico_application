import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // borderColor: '#609966',
    // borderWidth: 2,
  },
  label_container: {
    display: "flex",
    alignItems: "flex-start",
    width: "77%",
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: "#609966",
    fontFamily: "Montserrat-Bold",
  },
  input_container: {
    height: 53,
    width: "77%",

    paddingHorizontal: 8,
    padding: 10,
    paddingLeft: 20,

    color: "#40513B",
    backgroundColor: "#EDF1D6",

    borderRadius: 8,
    borderColor: "#609966",
    borderWidth: 1,

    fontFamily: "Montserrat-Bold",
    fontSize: 12,
  },
  editButton: {
    position: "absolute",
    right: "15%",
    bottom: "20%",
  },
});
