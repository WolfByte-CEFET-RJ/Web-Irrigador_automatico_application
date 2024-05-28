import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  home_container: {
    backgroundColor: "#EDF1D6",
    height: "100%",
  },
  home_title_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "10%",
  },
  home_title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#40513B",
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    color: "#40513B",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    fontFamily: "Montserrat-Bold",
  },
  input_container: {
    display: "flex",
    width: "100%",
  },
  subtitle_container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "3%",
  },
  contentContainer: {
    flexGrow: 1,
  },
  bottomBar_container: {
    backgroundColor: "#EDF1D6",
    position: "absolute",
    width: "100%",
    height: 95,
    bottom: 0,
  },
  btndiv: {
    marginTop: "4%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
