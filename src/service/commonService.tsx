import { Alert } from "react-native";
import I18nContext from "../translations/I18nContext";
import Toast, { ToastShowParams } from "react-native-toast-message";
var MIN = 60e3;
var HOUR = MIN * 60;
var DAY = HOUR * 24;
var YEAR = DAY * 365;
var MONTH = DAY * 30;

class CommonService {
  errorHandler(e) {
    if (e.message === "Unauthorized") {
      Alert.alert(
        I18nContext.getString("invalid_username_password_title"),
        I18nContext.getString("invalid_username_password"),
      );
    } else if (e && e.statusCode === 500) {
      Alert.alert("Oops!", I18nContext.getString("internal_server_error"));
    } else if (e.message === "RESET_PASSWORD.EMAIL_SENT_RECENTLY") {
      Alert.alert(
        "Message",
        I18nContext.getString("forgot_password_already_sent"),
      );
    } else if (e.message === "Post code is incorrect") {
      Alert.alert(
        "Oops!",
        I18nContext.getString("please_enter_correct_post_code"),
      );
    } else if (
      e.statusCode === 403 ||
      e.message === "This shift is no longer available."
    ) {
      Alert.alert(
        "Unfortunately!",
        I18nContext.getString("error_notification_message"),
      );
    } else {
      Alert.alert("Oops!", I18nContext.getString("error_support_message"));
    }
  }

  getMonth(month) {
    switch (month) {
      case "January":
        return 0;
      case "February":
        return 1;
      case "March":
        return 2;
      case "April":
        return 3;
      case "May":
        return 4;
      case "June":
        return 5;
      case "July":
        return 6;
      case "August":
        return 7;
      case "September":
        return 8;
      case "October":
        return 9;
      case "November":
        return 10;
      case "December":
        return 11;
      default:
        return 0;
    }
  }

  fronNow = (date, opts) => {
    opts = opts || {};

    var del = new Date(date).getTime() - Date.now();
    var abs = Math.abs(del);

    if (abs < MIN) return "just now";

    var periods = {
      year: abs / YEAR,
      month: (abs % YEAR) / MONTH,
      day: (abs % MONTH) / DAY,
      hour: (abs % DAY) / HOUR,
      minute: (abs % HOUR) / MIN,
    };

    var k,
      val,
      keep = [],
      max = opts.max || MIN; // large number

    for (k in periods) {
      if (keep.length < max) {
        val = Math.floor(periods[k]);
        if (val || opts.zero) {
          keep.push(val + " " + (val == 1 ? k : k + "s"));
        }
      }
    }

    k = keep.length; // reuse
    max = ", "; // reuse

    if (k > 1 && opts.and) {
      if (k == 2) max = " ";
      keep[--k] = " " + keep[k];
    }

    val = keep.join(max); // reuse
    if (opts.suffix && del > 0) {
      val += "";
    }
    if (del < 0) {
      return "true";
    }

    return val;
  };

  showToast(
    type: string,
    text1: string,
    text2?: string,
    autoHide?: boolean,
  ): void {
    const toastObject = { type } as ToastShowParams;
    if (text1) {
      toastObject.text1 = I18nContext.getString(text1);
    } else if (text2) {
      toastObject.text2 = I18nContext.getString(text2);
    }
    toastObject.autoHide = !autoHide ? autoHide : true;
    Toast.show(toastObject);
  }

  hideToast(): void {
    Toast.hide();
  }
}

export default new CommonService();
