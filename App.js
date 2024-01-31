import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/redux/store';

import Root from './src/screens/main/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Root />
      </GestureHandlerRootView>
    </PersistGate>
  </Provider>
);