/* eslint-disable */

import { Backdrop, CircularProgress } from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link.js";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Template from "../components/Template.jsx";
import { AuthorizationContext } from "../context/AuthContent";
import { app, db } from "../firebase/firebase";

export const Templates = () => {
  const [data, setdata] = useState<any>()
  const {currentUser} = useContext(AuthorizationContext)
 
  

  const [value, loading_DB, error_DB] = useCollection(
    collection(getFirestore(app), "users"),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const get_code = async () => {
    const code_arr: any = [];
    if(currentUser){

      value?.docs.map((doc) => {
        if (doc.data().userId == currentUser?.uid) {
          const our_obj = { data: doc.data(), id: doc.id };
          code_arr.push(our_obj);
        }
      });
    }
    setdata(code_arr);
  };
  useEffect(() => {
    const run = async () => {
      if (value) {
        get_code();
      }
      // const usersRef: any = collection(db, "users");
      // const snapshot = await getDocs(usersRef);
      // snapshot.forEach((doc: any) => {});
    };
    run();
  }, [value]);
  return (
    <div className="flex justify-center  flex-wrap w-full items-center min-h-screen bg-gradient-to-br from-red-800">
  
      {data?.length > 1 ?
        data.map((item: any) => (
          <div key={item?.id}>
      
          <div>
            <Template item={item} />
        </div>
          </div>
        )):
        (
          <div>All your templates will be available right here</div>
        )
        }
    </div>
  );
};
export default Templates;
