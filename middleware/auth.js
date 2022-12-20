import { getUserToken } from "~/service/api";

export default ({ redirect }) => {
  let userToken = getUserToken();
  
  if(!userToken){
    redirect('/')
  }
};
