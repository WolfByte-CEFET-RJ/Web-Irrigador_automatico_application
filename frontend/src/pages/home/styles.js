import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    backgroundColor: '#EDF1D6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
  },

  home_title_container: {
     width: '100%',
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: 'center',
     marginTop: '10%',
  },
  home_title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40513B',
    // fontFamily: 'Poppins-Bold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  search_container: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '77%',
    height: 45,
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#D8E4C2',
    borderRadius: 8,
    paddingLeft: 16,
  },
  searcher: {
    width: '100%',
    height: 45,
    color: 'rgba(64, 81, 59, 0.6)',
    fontWeight: 'bold',
  },
  iconHome: {
    position: 'absolute',
    right: '5%',
    bottom: '20%',
  },
  minhasHortas:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#40513B',
    marginTop: 32,
  },
  hortas_container: {
    borderColor: 'red',
    borderWidth: 3,
    display: 'flex',
    overflow: 'scroll',    
    alignItems:  'center',
    width: '100%',
    marginTop: 32,
  },
  horta: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    height: 60,
    backgroundColor: '#40513B',
    borderRadius: 8,
    marginBottom: 24,
    paddingLeft: 9,
    gap: 3,
  },
  textoSuperior:{
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  textoInferiorContainer:{
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  textoInferior:{
    color: '#ffffff'

  },
  iconHorta:{
    position: 'absolute',
    right: '5%',
    bottom: '22%',
  },
  bottomBar_container:{
    backgroundColor: '#EDF1D6',
    position: 'absolute',
    width: '100%',
    height: 95,
    bottom: 0,
  }
});