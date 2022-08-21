import { Backdrop, CircularProgress } from "@mui/material";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import EditT from "../../components/EditT.jsx";
import {  db } from "../../firebase/firebase";

const EditTemplate = () => {
  const [singleData, setSingleData] = useState<any>(null);
  useEffect(() => {
    const para = window.location.pathname.split("/");
   
    const res = para[2];

    const runStaticPage = async () => {
      const docArr: any = [];
      const usersRef: any = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc: any) => {
        const our_obj = { data: doc.data(), id: doc.id };
        docArr.push(our_obj);
      });

      const code_json = docArr.find((item: any) => item.id == res);
      setSingleData(code_json);
    };
    runStaticPage();
  }, []);
  return (
    <div>
       
      {singleData &&
      <EditT data={singleData} />
      }
    </div>
  );
};

export default EditTemplate;
