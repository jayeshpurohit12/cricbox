import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components";
import { RespScreenWidth, RespScreenHeight } from "../../styles/screen.style";
import { FontSize } from "../../styles/sizes";
import I18nContext from "../../translations/I18nContext";

interface IProps {
  placeholder?: string;
}

const SearchContainer = styled.View`
  flex-direction: row;
  padding: ${RespScreenHeight(1.5)} ${RespScreenWidth(4)};
  border-radius: ${RespScreenHeight(1)};
  background-color: ${({ theme }) => theme.inputBoxColor};
`;

const SearchIcon = styled.Image``;

const SearchInput = styled.TextInput`
  padding-vertical: 0;
  color: ${({ theme }) => theme.blackColor};
  font-family: Poppins-Regular;
  font-size: ${FontSize.md};
  margin-left: ${RespScreenWidth(4)};
`;

const SearchBar: React.FC<IProps> = ({ placeholder }) => {
  return (
    <SearchContainer>
      <SearchIcon
        resizeMode={"cover"}
        style={styles.searchStyle}
        source={require("../../../assets/images/search.png")}
      />
      <SearchInput placeholder={I18nContext.getString(placeholder)} />
    </SearchContainer>
  );
};

const styles = StyleSheet.create({
  searchStyle: {
    width: 25,
    height: 25,
  },
});

export default SearchBar;
