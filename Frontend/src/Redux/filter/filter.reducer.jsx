import { convertObject } from "../../Utils/convertObject";
import { SAVE_DATA, FILTER_DATA } from "../filter/filter.type";

export const filterInitalState = {
  data: [],
  backupdata: [],
};

export const filterReducer = (state = filterInitalState, { type, payload }) => {
  switch (type) {
    case FILTER_DATA:
      // console.log(payload, "in redux filterdata");
      let arr = convertObject(payload);
      let q = arr.join(" && ");
      // console.log(arr);
      // console.log(q, "in q");
      let ans;
      if (q === "") {
        ans = state.backupdata;
      } else {
        ans = state.backupdata.filter((ele) => eval(q));
      }
      // console.log(ans);
      return {
        ...state,
        data: ans,
      };

    case SAVE_DATA:
      console.log("payload for savedata", payload);
      return {
        ...state,
        data: payload,
        backupdata: payload,
      };

    default: {
      return state;
    }
  }
};
