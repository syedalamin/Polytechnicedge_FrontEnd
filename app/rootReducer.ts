import { combineSlices } from "@reduxjs/toolkit";
import { baseApi } from "@/services/redux/api/baseApi";

// 🎯 combineSlices ব্যবহার করে অবজেক্টের বদলে একটি ইনজেক্টেবল রুট রিডিউসার তৈরি করা হলো
export const rootReducer = combineSlices(baseApi);