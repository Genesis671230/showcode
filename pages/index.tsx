import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import { AuthorizationContext } from "../context/AuthContent";
import { Backdrop, CircularProgress } from "@mui/material";

interface I_obj {
  code: string;
  email: string;
  password: string;
}
const Home: NextPage = () => {
  const [code, setcode] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [showSignupOrSignin, setshowSignupOrSignin] = useState<boolean>(false);
  const [user, loading, error] = useAuthState(auth);
  const [userData, setuserData] = useState<any>();
  const [value, loading_DB, error_DB] = useCollection(
    collection(getFirestore(app), "users"),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  const { currentUser, dispatch } = useContext<any>(AuthorizationContext);

  const submit_code = async () => {
    if (code) {
      const res: any = collection(db, "users");
      await addDoc(res, { code: code, userId: currentUser.uid });
      setcode("");
    }
  };

  const signup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      setemail("")
      setpassword("")
      setcode("")
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
    }
  };

  const singin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      console.log(user, "this is user");
      dispatch({ type: "LOGIN", payload: user });
      setemail("")
      setpassword("")
    } catch (err: any) {
      const errorCode = err.code;
      const errorMessage = err.message;
    }
  };
const [showCircle, setshowCircle] = useState<boolean>(true);
  useEffect(() => {
    
    setInterval(()=>{
      setshowCircle(false);
    },2000)
    
    if (currentUser != null && currentUser != "undefined" ) {
      setuserData(currentUser);
    }
    if(currentUser == null || currentUser == "undefined"){
      setuserData(null);
    }

  }, [currentUser]);

  return (
    <div>
      <Head>
        <title>ShoCode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-black bg-cover  items-center justify-center  py-2">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showCircle}

        >
        <CircularProgress color="inherit" />  
      </Backdrop>
        <div>
          <div>
            {!userData && (
              <div className="p-2 bg-black text-white flex justify-between">
                <button
                  className="bg-yellow-500 p-2 rounded-md"
                  onClick={() => setshowSignupOrSignin((prev) => true)}
                >
                  Signup
                </button>
                <button
                  className="bg-red-500 p-2 rounded-md"
                  onClick={() => setshowSignupOrSignin((prev) => false)}
                >
                  Signin
                </button>
              </div>
            )}
            {showSignupOrSignin && !userData && (
              <div className="border-1 rounded-sm p-10 backdrop-blur-sm bg-white/30">
                <div className=" flex flex-col gap-5">
                  <div className="flex flex-col text-white ">
                    <label>Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e: any) => setemail(e.target.value)}
                      className="outline-none text-black p-2"
                    />
                  </div>

                  <div className="flex flex-col text-white">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e: any) => setpassword(e.target.value)}
                      className="outline-none text-black p-2"
                    />
                  </div>
                  <div className="p-2 bg-red-600 w-fit rounded-tl-xl">
                    <button onClick={signup}>Signup</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            {!showSignupOrSignin && !userData && (
              <div className="border-1 rounded-sm p-10 backdrop-blur-sm bg-white/30">
                <div className=" flex flex-col gap-5">
                  <div className="flex flex-col text-white ">
                    <label>Email</label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e: any) => setemail(e.target.value)}
                      className="outline-none text-black p-2"
                    />
                  </div>

                  <div className="flex flex-col text-white">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e: any) => setpassword(e.target.value)}
                      className="outline-none text-black p-2"
                    />
                  </div>
                  <div className="p-2 bg-red-600 w-fit rounded-tl-xl">
                    <button onClick={singin}>SignIn</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {userData && (
            <div className="">
              <div className="flex flex-col text-white ">
                <label>Create Template</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e: any) => setcode(e.target.value)}
                  className="outline-none rounded-md text-black p-2"
                />
              </div>

              <div className="p-2 bg-red-600 w-fit rounded-tl-xl mt-2 ">
                <button onClick={submit_code}>Create Template</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
