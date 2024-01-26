import { useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';

const UserContext=createContext();

const UserProvider=({children})=>{
   
    const [userData,setUserData]=useState([]) ;
    useEffect(async ()=>{
        const {data} = await axios.get(
            "http://localhost:8080/api/all-users"
          );
          setUserData(data.data);
    },[])
    return(
        <UserContext.Provider value={[userData,setUserData]}>
           {children}
        </UserContext.Provider>
    );
}

//create hook

const useData=()=>{
   return useContext(UserContext)
}


export {useData,UserProvider}