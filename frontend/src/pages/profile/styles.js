import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1D6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo_container:{
    marginBottom: 10,
    marginTop: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title:{
    fontSize: 24,
    color: '#40513B',
    fontFamily: 'Montserrat-Bold', 
    marginBottom: 16,
  }, 
  subtitle:{
    fontSize: 17,
    color: '#609966',
    fontFamily: 'Montserrat-Bold', 
  },
  input_container:{
    display: 'flex',
    width: '100%',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  notification_container:{
    width: '77%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  bottomBar_container:{
    backgroundColor: '#EDF1D6',
    position: 'absolute',
    width: '100%',
    height: 95,
    bottom: 0,
  },
  notificationSwitch:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D8E4C2',
    borderRadius: 8,
    height: 58,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
  },
  text:{
    color: '#40513B',
    fontFamily: 'Montserrat-Bold', 
    fontSize: 12
  },
  button_container:{
    width: '100%',
    height: 85.2,
    marginTop: 50,
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  delete_container:{
    marginTop: 40,
  },
  delete_text:{
    fontWeight: 12,
    color: '#40513B',
    fontFamily: 'Montserrat-Bold', 
  },
  clickHere: {
    color: '#D26E28',
    textDecorationLine: 'underline',
  },
});