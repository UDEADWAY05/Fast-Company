import httpService from "./http.servise";
const commentEndPoint = "comment/";

const commentServise = {
  createComment: async ( payload ) => {
    const { data } = await httpService.post(commentEndPoint, payload);
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
        params: {
            orderBy: "pageId",
            equalTo: `${pageId}`      
        }
    })
    return data
  },
  removeComment: async (comId) => {
    const { data } = await httpService.delete(commentEndPoint + comId)
    return data
  }
};
export default commentServise;
