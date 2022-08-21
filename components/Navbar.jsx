import Link from "next/link"
import { useContext } from "react";
import { AuthorizationContext } from "../context/AuthContent";

const Navbar = () => {



  const { currentUser, dispatch } = useContext(AuthorizationContext);
  const logout = () => {
    dispatch({type:"LOGOUT"})
  }

  return (
    <div className="flex justify-between text-black p-2  bg-white">
        <div><Link href="/">Logo</Link></div>
        <div className="flex gap-5">
          <Link href="/">Home</Link>
            <div> 
            <Link href="/Templates">
                Templates
            </Link>
            </div>
        
        </div>
        {
          currentUser ? (
            <div onClick={logout}>Logout</div>
            
            ): 
            <div>Login</div>
        }
    </div>
  )
}

export default Navbar