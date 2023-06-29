import {RouteProp} from '@react-navigation/native';
interface StackRoutes {
  StartUp: undefined;
  SignIn: undefined;
  SignUp: string;
  ForgotPassword: undefined;
  ForgotUsername: undefined;
  VerifyCode: undefined;
  CreateNewPassword: undefined;
  DrawerStack: DrawerRoutes;
}

interface DrawerRoutes {
  DashboardStack: DashboardStack;
  PaymentHistoryStack: PaymentHistoryStack;
  ReportStack: ReportStack;
  FaqStack: FaqStack;
  PolicyStack: PolicyStack;
  TermsStack: TermsStack;
  SetttingsStack: SetttingsStack;
}

interface ReportStack {
  Reports: undefined;
}

interface FaqStack {
  Faq: undefined;
}

interface PolicyStack {
  PrivacyAndPolicies: undefined;
}
interface TermsStack {
  TermsAndConditions: undefined;
}

interface PaymentHistoryStack {
  PaymentHistory: undefined;
}

interface SetttingsStack {
  Settings: undefined;
  ConfigurationTips: undefined;
}

interface DashboardStack {
  Dashboard: undefined;
  CryptoMethods: undefined;
  AddTips: undefined;
  ScanBarcode: undefined;
}

export interface NavigationProps {
  navigation: RouteProp<StackRoutes, 'Profile'>;
}

export interface CryptoMethods {
  image: string;
  name: string;
  label: string;
  id: string;
}
