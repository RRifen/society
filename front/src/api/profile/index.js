import {axiosInstance} from "../instance";
import Endpoints from "../endpoints";

export const getProfile = (params) => axiosInstance.post(Endpoints.PROFILE.GET, params)