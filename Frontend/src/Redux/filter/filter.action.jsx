import { SAVE_DATA, FILTER_DATA } from "../filter/filter.type";

export const filterdata = (data) => ({ type: FILTER_DATA, payload: data });

export const saveDatafilter = (data) => ({ type: SAVE_DATA, payload: data });
