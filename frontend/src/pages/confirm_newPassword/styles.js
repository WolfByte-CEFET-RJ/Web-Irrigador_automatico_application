import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Confirm_newPassword_container:{
    flex: 1,
    backgroundColor: "#EDF1D6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    },
    slogan_container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    app_name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#40513B",
        fontFamily: "Montserrat-Bold",
    },
    app_slogan: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#609966",
    },
    logo: {
        width: 178,
        height: 178,
        marginBottom: "5%",
        marginTop: "5%",
    },
    inputConfirm_container: {
        display: "flex",
        width: "100%",
        marginBottom: "15%"
    },
    subtittle_confirm_input:{
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: 13,
        color: "#40513b",
        fontFamily: "Montserrat-Bold",
        marginBottom: "2%",
        marginLeft: "13%",

    },
    button_space:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        marginBottom:"5%"

    }

})