/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./src/redux/sagas/RootSaga";
import rootReducers from "./src/redux/reducers";
import DarkThemeProvider from "./src/components/DarkThemeProvider";
import AppNavigator from "./src/routes/AppNavigtor";
import messaging from "@react-native-firebase/messaging";
import WithSplashScreen from "./src/components/AppSplashScreen";
import Toast, {
  SuccessToast,
  InfoToast,
  ErrorToast,
  ToastProps,
} from "react-native-toast-message";
const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  const requestUserPermission = async (): Promise<void> => {
    await messaging().requestPermission();
  };
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  const toastConfig = {
    success: (props: ToastProps) => (
      <SuccessToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />
    ),
    info: (props: ToastProps) => (
      <InfoToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />
    ),
    error: (props: ToastProps) => (
      <ErrorToast {...props} text1NumberOfLines={2} text2NumberOfLines={2} />
    ),
  };

  return (
    <Provider store={store}>
      <WithSplashScreen isAppReady={isAppReady}>
        <DarkThemeProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
              <Toast config={toastConfig} />
            </NavigationContainer>
          </SafeAreaProvider>
        </DarkThemeProvider>
      </WithSplashScreen>
    </Provider>
    // <>
    // <Login/>
    // </>
  );
};

export default App;
