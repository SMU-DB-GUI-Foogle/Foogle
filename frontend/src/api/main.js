import ajax from "./ajax";
const LOCALURL ="http://localhost:8000";
// 获取所有食物
export const reqAllFood = (search) => ajax(LOCALURL + `/product/`, {}, 'GET');
// 添加喜欢食物
export const reqAddLikeFood = food => ajax( LOCALURL + '/product/likes', food, 'POST');
// 移除喜欢食物
export const reqDeleteLikeFood = food => ajax(LOCALURL + '/product/likes', food, 'DELETE');
// 添加不喜欢食物
export const reqAddDislikeFood = food => ajax(LOCALURL + '/product/dislikes', food, 'POST');
// 移除不喜欢食物
export const reqDeleteDislikeFood = food => ajax(LOCALURL + '/product/dislikes', food, 'DELETE');