import { SortButtonType, SortOrderType, SortType } from "@apptypes/index";
import { Dimensions } from "react-native";

export const DEFAULT_SORT_TYPE: SortType = {
    buttonType: SortButtonType.LEVEL,
    orderType: SortOrderType.ASCENDING,
};

export const SCREEN_DIMENSION = {
    screen: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    window: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
};

export const DEFAULT_ROOMS_LIST_TEST_DATA = '[{"name":"Kopi-O","capacity":"8","level":"7","availability":{"08:00":"1","08:30":"1","09:00":"0","09:30":"0","10:00":"0","10:30":"0","11:00":"0","11:30":"0","12:00":"0","12:30":"0","13:00":"0","13:30":"0","14:00":"1","14:30":"1","15:00":"0","15:30":"0","16:00":"0","16:30":"0","17:00":"0","17:30":"0","18:00":"0","18:30":"0","19:00":"0","19:30":"0"}},{"name":"Teh-O","capacity":"8","level":"9","availability":{"08:00":"1","08:30":"1","09:00":"0","09:30":"0","10:00":"0","10:30":"0","11:00":"0","11:30":"0","12:00":"0","12:30":"0","13:00":"0","13:30":"0","14:00":"1","14:30":"1","15:00":"0","15:30":"0","16:00":"0","16:30":"0","17:00":"0","17:30":"0","18:00":"0","18:30":"0","19:00":"0","19:30":"0"}},{"name":"Milo","capacity":"4","level":"7","availability":{"08:00":"1","08:30":"1","09:00":"0","09:30":"0","10:00":"0","10:30":"0","11:00":"0","11:30":"0","12:00":"0","12:30":"0","13:00":"0","13:30":"0","14:00":"0","14:30":"1","15:00":"0","15:30":"0","16:00":"0","16:30":"0","17:00":"0","17:30":"0","18:00":"0","18:30":"0","19:00":"0","19:30":"0"}},{"name":"Holick","capacity":"4","level":"10","availability":{"08:00":"1","08:30":"1","09:00":"0","09:30":"0","10:00":"0","10:30":"0","11:00":"0","11:30":"0","12:00":"0","12:30":"0","13:00":"0","13:30":"0","14:00":"1","14:30":"1","15:00":"0","15:30":"0","16:00":"0","16:30":"0","17:00":"0","17:30":"0","18:00":"1","18:30":"0","19:00":"0","19:30":"0"}},{"name":"Teh-Halia","capacity":"4","level":"8","availability":{"08:00":"1","08:30":"1","09:00":"0","09:30":"0","10:00":"0","10:30":"0","11:00":"0","11:30":"0","12:00":"0","12:30":"0","13:00":"0","13:30":"0","14:00":"0","14:30":"1","15:00":"0","15:30":"0","16:00":"0","16:30":"0","17:00":"0","17:30":"0","18:00":"1","18:30":"0","19:00":"0","19:30":"0"}}]';