import React, { useEffect, useRef, useState } from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import VersionInfo from "react-native-version-info";

const WithSplashScreen = ({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      {isAppReady && children}

      <Splash isAppReady={isAppReady} />
    </>
  );
};

const LOADING_IMAGE = "Loading image";
const FADE_IN_IMAGE = "Fade in image";
const WAIT_FOR_APP_TO_BE_READY = "Wait for app to be ready";
const FADE_OUT = "Fade out";
const HIDDEN = "Hidden";

export const Splash = ({ isAppReady }: { isAppReady: boolean }) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const [state, setState] = useState<
    | typeof LOADING_IMAGE
    | typeof FADE_IN_IMAGE
    | typeof WAIT_FOR_APP_TO_BE_READY
    | typeof FADE_OUT
    | typeof HIDDEN
  >(LOADING_IMAGE);

  useEffect(() => {
    if (state === FADE_IN_IMAGE) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000, // Fade in duration
        useNativeDriver: false,
      }).start(() => {
        setState(WAIT_FOR_APP_TO_BE_READY);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    if (state === FADE_OUT) {
      Animated.timing(containerOpacity, {
        toValue: 0.01,
        duration: 1000, // Fade out duration
        delay: 1000, // Minimum time the logo will stay visible
        useNativeDriver: false,
      }).start(() => {
        setState(HIDDEN);
      });
    }
  }, [containerOpacity, state]);

  if (state === HIDDEN) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Animated.View
        collapsable={false}
        style={[style.container, { opacity: containerOpacity }]}
      >
        <Animatable.Image
          source={require("../../../assets/logo.png")}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          onLoad={() => {
            setState(FADE_IN_IMAGE);
          }}
          style={[style.image]}
          resizeMode="contain"
        />
        {/* <Animatable.Text animation="fadeIn" style={style.app_name}>
          Cricbox
        </Animatable.Text> */}
        <Animatable.Text animation="fadeIn" style={style.app_version}>
          {VersionInfo.appVersion}
        </Animatable.Text>
      </Animated.View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  app_name: {
    color: "#31D9AC",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 25,
    fontWeight: "800",
    textTransform: "uppercase",
    marginTop: 20,
  },
  app_version: {
    color: "#31D9AC",
    fontSize: 14,
    fontWeight: "400",
    bottom: 60,
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
  },
});

export default WithSplashScreen;
