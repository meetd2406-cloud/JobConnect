import{createContext,useContext,useState}from"react";import api from"../api.js";
const C=createContext();
export function AuthProvider({children}){
 const[user,setUser]=useState(()=>JSON.parse(localStorage.getItem("jobconnect_user")||"null"));
 const save=d=>{localStorage.setItem("jobconnect_token",d.token);localStorage.setItem("jobconnect_user",JSON.stringify(d.user));setUser(d.user)};
 const login=async(data)=>save((await api.post("/auth/login",data)).data);
 const register=async(data)=>save((await api.post("/auth/register",data)).data);
 const logout=()=>{localStorage.removeItem("jobconnect_token");localStorage.removeItem("jobconnect_user");setUser(null)};
 return <C.Provider value={{user,login,register,logout}}>{children}</C.Provider>
}
export const useAuth=()=>useContext(C);
