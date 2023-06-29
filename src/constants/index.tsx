export const cryptoMethods = [
  {
    image: require("../../assets/images/bitcoin.png"),
    name: "bitcoin",
    label: "btc",
    id: "1",
  },
  {
    image: require("../../assets/images/ethereum.png"),
    name: "ethereum",
    label: "eth",
    id: "2",
  },
  {
    image: require("../../assets/images/bitcoin-cash.png"),
    name: "bitcoin_cash",
    label: "bch",
    id: "3",
  },
  {
    image: require("../../assets/images/tether.png"),
    name: "tether",
    label: "usdt",
    id: "4",
  },
  {
    image: require("../../assets/images/dogecoin.png"),
    name: "dogecoin",
    label: "doge",
    id: "5",
  },
  {
    image: require("../../assets/images/dai.png"),
    name: "dai",
    label: "dai",
    id: "6",
  },
];

export const tips = [
  {
    price: "$1.00",
    percentage: "2%",
  },
  {
    price: "$2.00",
    percentage: "10%",
  },
  {
    price: "$3.00",
    percentage: "5%",
  },
  {
    price: "$4.00",
    percentage: "1%",
  },
  {
    price: "$5.00",
    percentage: "9%",
  },
  {
    price: "$6.00",
    percentage: "4%",
  },
];

export const paymentHistory = [
  {
    incoming: true,
    price: "$1.00",
    id: "1",
  },
  {
    incoming: true,
    price: "$1.00",
    id: "2",
  },
  {
    incoming: true,
    price: "$1.00",
    id: "3",
  },

  {
    incoming: true,
    price: "$1.00",
    id: "4",
  },
  {
    incoming: true,
    price: "$1.00",
    id: "5",
  },

  {
    incoming: true,
    price: "$1.00",
    id: "6",
  },
  {
    incoming: false,
    price: "$1.00",
    id: "7",
  },

  {
    incoming: true,
    price: "$1.00",
    id: "8",
  },
  {
    incoming: false,
    price: "$1.00",
    id: "9",
  },

  {
    incoming: true,
    price: "$1.00",
    id: "10",
  },
  {
    incoming: false,
    price: "$1.00",
    id: "11",
  },
  {
    incoming: true,
    price: "$1.00",
    id: "12",
  },
];

export const sideMenus = [
  {
    name: "dashboard",
    route: "DashboardStack",
    subRoute: "Dashboard",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/get_paid.png"),
    active_image: require("../../assets/images/get_paid.png"),
  },
  {
    name: "add_place",
    route: "CreatPlaceStack",
    type: ["box-admin", "admin"],
    image: require("../../assets/images/terms_and_conditions.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  {
    name: "pending_place",
    route: "PendingPlaceStack",
    subRoute: "PendingPlace",
    type: ["admin"],
    image: require("../../assets/images/terms_and_conditions.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  {
    name: "my_places",
    route: "MyPlaceStack",
    type: ["box-admin"],
    image: require("../../assets/images/terms_and_conditions.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  {
    name: "payment_history",
    route: "PaymentHistoryStack",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/payment_history.png"),
    active_image: require("../../assets/images/payment_history.png"),
  },
  {
    name: "reports",
    route: "ReportStack",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/reports.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  // {
  //   name: "settings",
  //   route: "SetttingsStack",
  //   type: ["normal", "box-admin", "admin"],
  //   image: require("../../assets/images/settings.png"),
  //   active_image: require("../../assets/images/settings.png"),
  // },
  // {
  //   name: "user_profile",
  //   type: ["normal", "box-admin", "admin"],
  //   image: require("../../assets/images/user_profile.png"),
  //   active_image: require("../../assets/images/user_profile.png"),
  // },
  {
    name: "faq",
    route: "FaqStack",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/faq.png"),
    active_image: require("../../assets/images/faq.png"),
  },
  {
    name: "term_and_conditions",
    route: "TermsStack",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/terms_and_conditions.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  {
    name: "privacy_policy",
    route: "PolicyStack",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/reports.png"),
    active_image: require("../../assets/images/reports.png"),
  },
  {
    name: "logout",
    type: ["normal", "box-admin", "admin"],
    image: require("../../assets/images/logout.png"),
    active_image: require("../../assets/images/logout.png"),
  },
];

export const GOOGLE_API_KEY = "AIzaSyAFJrJgI9QdDy5ejQOqlM666if31QZB1pg";
