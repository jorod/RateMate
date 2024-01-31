import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomLoginButton from '../components/CustomLoginButton';
import { privacyPolicy, eula } from '../managers/UserService';

const EULAScreen = ({ navigation, route }) => {
  const [url, setUrl] = useState('');
  const isPrivacy = route.params.privacy ?? false;
  const webViewRef = useRef();

  useEffect(() => {
    const fetchURL = async () => {
      let urlToLoad = isPrivacy ? await privacyPolicy() : await eula();

      setUrl(urlToLoad);
      if (webViewRef) {
        webViewRef.current.reload();
      }
    };

    fetchURL().catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} ref={webViewRef} startInLoadingState={true} />
      {route.params.showAccept && (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.1 }}>
          <CustomLoginButton navigation={navigation} type={route.params.type} />
        </View>
      )}
    </View>
  );
};

export default EULAScreen;
