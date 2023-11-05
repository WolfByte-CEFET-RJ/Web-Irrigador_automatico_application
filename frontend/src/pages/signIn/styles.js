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
  },
  input_container:{
    display: 'flex',
    width: '100%',
    
    borderColor: 'blue',
    borderWidth: 1,
  },
  remember_forgot:{
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    width: '77%',
    borderColor: 'red',
    borderWidth: 1,
  },
  forgot_password:{
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
});