import React from "react";
import { ThemeProvider } from "styled-components";
import connectStore from "../../redux/connect";
import { darkTheme, lightTheme } from "../ThemeColor";

interface IProps {
  darkThemeEnabled: boolean;
  childern: React.ReactNode;
}

const DarkThemeProvider: React.FC<IProps> = ({
  children,
  darkThemeEnabled,
}) => {
  return (
    <ThemeProvider theme={darkThemeEnabled ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default connectStore(DarkThemeProvider);
