import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  AppFlatList,
  SpaceContainer,
  ContainTitle,
  GreyCard,
  TextContainer,
  CardBlackText,
  CardGreyText,
  DownArrow,
} from "../../styles/common.style";
import { paymentHistory } from "../../constants";
import I18nContext from "../../translations/I18nContext";
import styled from "styled-components";

interface IProps {
  headerText: string;
  title: string;
  descriptionText: string;
  date: string;
}

interface IData {
  expand?: boolean;
  incoming: boolean;
  price: string;
  id: string;
}

const Container = styled.View`
  width: 100%;
  flex-direction: row;
`;

const ReportFaqCards: React.FC<IProps> = ({
  headerText,
  descriptionText,
  date,
  title,
}) => {
  const [data, setData] = useState([...paymentHistory]);

  const toggle = (index) => {
    const tempData: IData[] = [...data];
    tempData[index].expand = !tempData[index].expand;
    setData(tempData);
  };

  return (
    <AppFlatList
      data={data}
      contentContainerStyle={{ paddingBottom: 60 }}
      ListHeaderComponent={
        <SpaceContainer marginBottom={3}>
          <ContainTitle>{I18nContext.getString(title)}</ContainTitle>
        </SpaceContainer>
      }
      renderItem={({ item, index }) => (
        <GreyCard key={index} onPress={() => toggle(index)}>
          <Container>
            <TextContainer>
              <CardBlackText>{headerText}</CardBlackText>
              {!item.expand ? <CardGreyText>{date}</CardGreyText> : null}
            </TextContainer>
            <DownArrow
              style={styles.arrowStyle}
              resizeMode={"cover"}
              source={require("../../../assets/images/down-arrow.png")}
            />
          </Container>
          {item.expand ? (
            <Container>
              <CardGreyText>{descriptionText}</CardGreyText>
            </Container>
          ) : null}
        </GreyCard>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  arrowStyle: {
    width: 34,
    height: 34,
  },
});

export default ReportFaqCards;
