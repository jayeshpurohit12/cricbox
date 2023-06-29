import React, { ReactElement } from "react";
import styled from "styled-components";
import I18nContext from "../../translations/I18nContext";
import { FontSize } from "../../styles/sizes";
import { TouchableOpacity, KeyboardType } from "react-native";
import { RespScreenHeight, RespScreenWidth } from "../../styles/screen.style";

const CustomContainer = styled.View`
  margin-bottom: ${(props) =>
    props.containerBtm
      ? RespScreenHeight(props.containerBtm)
      : RespScreenHeight(4)};
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.inputLabelColor};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
`;

const RightBottomLabel = styled.Text`
  color: ${({ theme }) => theme.greenButton};
  font-size: ${FontSize.sm};
  font-family: Poppins-Regular;
  margin-left: auto;
`;

const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.inputBoxColor};
  color: ${({ theme }) => theme.blackColor};
  border-radius: ${RespScreenHeight(1)};
  font-family: Poppins-Regular;
  font-size: ${FontSize.md};
  margin-top: auto;
  padding: ${RespScreenHeight(2.4)} ${RespScreenWidth(6)};
  margin-bottom: auto;
  margin-top: ${RespScreenHeight(0.8)};
  margin-bottom: ${RespScreenHeight(0.8)};
  padding-vertical: 0;
`;

interface IProps {
  label: string;
  type?: string;
  secureTextEntry?: boolean;
  placeholder: string;
  bottomLabel?: string;
  value?: string | number | null;
  multiline?: boolean;
  error?: ReactElement;
  keyboardType?: KeyboardType;
  containerBtm?: number;
  editable?: boolean;
  onPress?: () => void;
  onBlur?: () => void;
  onChangeText?: (value: string) => void;
}

const CustomInput: React.FC<IProps> = ({
  label,
  placeholder,
  bottomLabel,
  secureTextEntry,
  onPress,
  value,
  multiline,
  keyboardType,
  onBlur,
  onChangeText,
  error,
  editable = true,
  containerBtm = 4,
}) => {
  return (
    <CustomContainer containerBtm={containerBtm}>
      <Label>{I18nContext.getString(label)}</Label>

      <Input
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        value={value}
        onBlur={onBlur}
        pointerEvents={!editable ? "none" : "auto"}
        editable={editable}
        multiline={multiline}
        keyboardType={keyboardType ? keyboardType : "default"}
        onChangeText={onChangeText}
        autoCapitalize={"none"}
      />
      {error ? error : null}

      {bottomLabel ? (
        <TouchableOpacity onPress={onPress}>
          <RightBottomLabel>
            {I18nContext.getString(bottomLabel)}?
          </RightBottomLabel>
        </TouchableOpacity>
      ) : null}
    </CustomContainer>
  );
};

export default CustomInput;
