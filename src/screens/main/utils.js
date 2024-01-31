import AppStyles from '../../config/AppStyles';
import Images from '../../config/Images';
import Colors from '../../constants/Colors';

export const navBarOptions = (screenTitle) => ({
  title: screenTitle ?? '',
  headerStyle: {
    backgroundColor: Colors.Blue,
  },
  headerTintColor: Colors.White,
  headerTitleStyle: AppStyles.headerTitleStyle,
  headerBackTitleVisible: false,
});

export const customFonts = {
  bloggersans: require('../../assets/fonts/Blogger_Sans.otf'),
  'bloggersans-bold': require('../../assets/fonts/Blogger_Sans-Bold.otf'),
  'bloggersans-medium': require('../../assets/fonts/Blogger_Sans-Medium.otf'),
};

export const tabs = {
  MainTab: {
    image: Images.homeTab,
    imageSelected: Images.homeTabSelected,
  },
  ShoppingListTab: {
    image: Images.listsTab,
    imageSelected: Images.listsTabSelected,
  },
  ProfileTab: {
    image: Images.profileTab,
    imageSelected: Images.profileTabSelected,
  },
};
