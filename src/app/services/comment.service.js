import httpService from "./http.servise";
const commentEndPoint = "comment/";

const commentServise = {
  createComment: async ( comment ) => {
    const { data } = await httpService.put(commentEndPoint + comment._id, comment);
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
        params: {
            orderBy: `"pageId"`,
            equalTo: `"${pageId}"`      
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
