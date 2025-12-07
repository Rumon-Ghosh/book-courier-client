import { useContext } from "react"
import { AuthContext } from "../provides/AuthContext"


const useAuth = () => {
  const authInfo = useContext(AuthContext)
  return authInfo
}

export default useAuth
