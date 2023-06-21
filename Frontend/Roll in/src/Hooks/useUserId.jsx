import jwt_decode from 'jwt-decode';
import {  useNavigate } from 'react-router-dom';

const useUserId = () =>{
    const navigate = useNavigate();
 if(localStorage.token ){
    const decode = jwt_decode(localStorage.token);
 const userId = decode.userId;
 const userRole = decode.userRole
 return {userId, userRole};
 }else{

 return {userId:"", userRole:""};
 
}
 
//  console.log({userId, userRole});
}
export default useUserId;