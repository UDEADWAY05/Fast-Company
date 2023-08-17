import httpService from "./http.servise";
import localStorageService from "./localStorage";

const userEndPoint = "user/" 

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndPoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndPoint+payload._id, payload)
    return data
  },
  login: async (payload) => {
    const { data } = await httpService.get(userEndPoint + payload._id)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(userEndPoint + localStorageService.getUserId());
    return data;
  },
  updateUser: async (payload) => {
      const { data } = await httpService.patch(userEndPoint + payload._id, payload)
      return data
  }
};

export default userService;