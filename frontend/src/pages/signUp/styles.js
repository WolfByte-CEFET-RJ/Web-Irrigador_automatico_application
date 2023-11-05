import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cadastro_container: {
    flex: 1,
    backgroundColor: '#EDF1D6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo_container:{
    marginBottom: 40,
    marginTop: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  form_container:{
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(157, 192, 139, 0.26)',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
  },
  header_container:{
    display: 'flex',
    flexDirection: 'row',
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  return_button_container:{
    position: 'absolute',
    left: '5%',
  },
  slogan_container:{
    // borderColor: 'red',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  app_name:{
    fontSize: 24,
    fontWeight:  'bold',
    color: '#40513B',
    // fontFamily: 'Montserrat-Regular',  
  },
  app_slogan:{
    fontSize: 12,
    fontWeight: 'bold',
    color: '#609966',
  },
  input_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});