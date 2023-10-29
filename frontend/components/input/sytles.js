import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
    width: '100%'
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: '#609966',
  },
  input: {
    height: 40,
    backgroundColor: '#EDF1D6',
    borderColor: 'none',
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '77%',
    height: 60,
    padding: 10,
    color: 'rgba(64,81,59,0.6)',
  },
});