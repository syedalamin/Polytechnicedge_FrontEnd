import { combineSlices } from "@reduxjs/toolkit";
import { baseApi } from "@/services/redux/api/baseApi";


export const rootReducer = combineSlices(baseApi);