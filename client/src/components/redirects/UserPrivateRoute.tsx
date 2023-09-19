import * as React from 'react';
import { Navigate } from 'react-router-dom';



export default function UserPrivateRoute ({children}:any) {
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"))
  //const {user} = UseSelector(state => state.auth)
  if(user){
    return <Navigate to="/Home" />
  }
  return children
}
