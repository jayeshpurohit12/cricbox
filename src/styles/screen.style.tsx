
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const RespScreenHeight = percent => {
    return hp(percent + "%") + "px";
};

export const RespScreenWidth = percent => {
    return wp(percent + "%") + "px";
};
