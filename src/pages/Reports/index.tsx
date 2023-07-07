import React from "react";
import { NavigationProps } from "../../styles/common.interface";
import connectStore from "../../redux/connect";
import HeaderBar from "../../components/HeaderBar";
import ReportFaqCards from "../../components/ReportFaqCards";

interface IProps extends NavigationProps {}

const Reports: React.FC<IProps> = ({ navigation }) => {
  return (
    <React.Fragment>
      <HeaderBar showHelp={true} showBack={true} />
      <ReportFaqCards
        title="reports"
        headerText="Payment Flow Issue"
        date="Jul 15, 2021 10:57 AM"
        descriptionText={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
        }
      />
    </React.Fragment>
  );
};

export default connectStore(Reports);
