import axios from 'axios';

export const setAccessToken = (token: string) => {
  // NOTE: If multiple APIs will be used, implement authorization at the request level
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export enum RTF_ROLE {
  ADMIN = "admin",
  BUREAU_ADMIN = "bureau",
  USER = 'user'
}

const GET_USER_URL = 'https://run.mocky.io/v3/51e662ff-75c4-4950-b17a-e9e0ccd0779c';
 
export interface IRTFUser {
 identity:any,
 permission: Array<any>
}
 
/**
   * Get the current user
   * @returns {object} the IRTFUser object
   */
export const getCurrentUser = async () => {
  return axios.get(GET_USER_URL);
}
