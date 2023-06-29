import { NavigationProps } from "../../styles/common.interface";
import React from "react";
import HeaderBar from "../../components/HeaderBar";
import {
  AppScrollView,
  SpaceContainer,
  RegularText,
} from "../../styles/common.style";
import LinearCard from "../../components/LinearCard";
import I18nContext from "../../translations/I18nContext";
import { QrCodeContainer, WatingText } from "./style";
import QRCode from "react-native-qrcode-svg";
interface IProps extends NavigationProps {}

const ScanBarcode: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <AppScrollView>
        <LinearCard
          shortText="total_to_pay"
          image={require("../../../assets/images/bitcoin.png")}
          amount="$348.000"
        />
        <SpaceContainer marginTop={8} marginBottom={8}>
          <RegularText color="blackColor" fontSize="md" textAlign="center">
            {I18nContext.getString("scan_barcode")}
          </RegularText>
        </SpaceContainer>
        <QrCodeContainer>
          <QRCode value="heavenex" size={200} />
        </QrCodeContainer>
        <WatingText>
          {I18nContext.getString("waiting_for_payment")}...
        </WatingText>
      </AppScrollView>
    </React.Fragment>
  );
};
export default ScanBarcode;
