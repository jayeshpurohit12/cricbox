import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {CustomRow, GreyView, RegularText} from '../../styles/common.style';
import styled from 'styled-components';
import {RespScreenHeight} from '../../styles/screen.style';

const Icons = styled.Image``;

const TipPercentageCounter = () => {
  const items = ['55%', '40%', '75%', '30%'];

  return (
    <CustomRow justifySpace={true}>
      {items.map((value, index) => {
        return (
          <GreyView width={47} key={index}>
            <CustomRow>
              <TouchableOpacity>
                <Icons
                  style={styles.iconStyle}
                  source={require('../../../assets/images/min.png')}
                />
              </TouchableOpacity>
              <RegularText
                marginTop={RespScreenHeight(0.3)}
                marginLeft="auto"
                marginRight="auto"
                fontSize="md"
                color={'inputLabelColor'}>
                {value}
              </RegularText>
              <TouchableOpacity>
                <Icons
                  style={styles.iconStyle}
                  source={require('../../../assets/images/max.png')}
                />
              </TouchableOpacity>
            </CustomRow>
          </GreyView>
        );
      })}
    </CustomRow>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 28,
    height: 28,
  },
});

export default TipPercentageCounter;
