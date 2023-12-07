import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: '#EDF1D6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  slogan_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_name:{
    fontSize: 24,
    fontWeight:  'bold',
    color: '#40513B',
  },
  app_slogan:{
    fontSize: 12,
    fontWeight: 'bold',
    color: '#609966',
  },
  logo:{
    width: 178,
    height: 178,
    marginBottom: '5%',
    marginTop: '5%',
  },
  input_container:{
    display: 'flex',
    width: '100%',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  remember_forgot:{
    display: 'flex',
    flexDirection:'row',
    width: '77%',
    marginBottom: '5%',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  remember: {
    display:'flex',
    flexDirection: 'row',
    width: '50%',
  },
  remember_text:{
    fontWeight:'bold',
    fontSize: 10,
    color: '#40513B',
    marginLeft: '5%',
  },
  forgot_text:{
    fontWeight:'bold',
    fontSize: 10,
    color: '#40513B',
  },
  cadastrar_container:{
    display: 'flex',
    width: '77%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  cadastrar_text:{
    fontWeight:'bold',
    fontSize: 12,
    color: '#609966',
  },
  cadastrar_navegacao:{
    fontWeight:'bold',
    fontSize: 12,
    color: '#40513B',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});