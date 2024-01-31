import Fonts from '../constants/Fonts';

export default AppStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScrollView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 50,
  },
  containerScrollViewLogin: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitleStyle: {
    fontFamily: Fonts.FontFamilyBold,
    fontSize: 24,
    textAlign: 'center',
    flex: 1,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  whiteText: {
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontFamily: Fonts.FontFamilyBold,
    // top: Platform.OS === 'ios'? 2 : 0
  },
  loginButton: {
    backgroundColor: '#0970B2',
    borderRadius: 4,
    marginTop: 20,
    width: Fonts.Width,
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  noErrorCheck: {
    margin: 15,
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EEEF',
    width: Fonts.Width,
    height: '9%',
  },
  LabelContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: '12%',
    marginRight: '12%',
  },
  ImageStyleMail: {
    padding: 10,
    margin: 15,
    height: 20,
    width: 26,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  ImageStyleKey: {
    padding: 10,
    margin: 15,
    height: 25,
    width: 11,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  ImageStyleUser: {
    padding: 10,
    margin: 12,
    height: 24,
    width: 22.5,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'black',
    borderRadius: 2,
    fontSize: 18,
    fontFamily: Fonts.FontFamily,
  },
  redInput: {
    color: 'red',
    fontFamily: Fonts.FontFamily,
  },
  label: {
    marginTop: 18,
    marginBottom: 18,
    color: 'black',
    fontSize: 20,
    fontFamily: Fonts.FontFamily,
  },
  errorInput: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontStyle: 'italic',
    marginLeft: '12%',
    marginRight: '12%',
    marginTop: 7,
    color: 'red',
    fontSize: 15,
    fontFamily: Fonts.FontFamily,
  },
  tabImage: {
    aspectRatio: 1,
    width: undefined,
    height: '70%',
    resizeMode: 'contain',
  },
};
