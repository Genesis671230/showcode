import { Backdrop, CircularProgress } from "@mui/material";
import { sanitize } from "dompurify";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { app, auth, db } from "../firebase/firebase";

const Template = ({ item }) => {
  const [code, setcode] = useState("");
  const [showCircle, setshowCircle] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setshowCircle(false);
    }, 2000);
  }, []);

  const [user, loading, error] = useAuthState(auth);

  const updateMyTemplate = async () => {
    const res = doc(db, "users", item?.id);
    await updateDoc(res, {
      code: code,
    });
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showCircle}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: sanitize(item?.data?.code) }}
      ></div>

      <div className="p-2 ">
        <input
          className="outline-none"
          type="text"
          value={code}
          onChange={(e) => setcode(e.target.value)}
        />
        <button
          className="p-2 bg-red-600 rounded-md m-5 ml-5 "
          onClick={updateMyTemplate}
        >
          update
        </button>
        <Link href={`/editTemplate/${item?.id}`}>
          <button className="p-2">Watch</button>
        </Link>
      </div>
    </div>
  );
};

export default Template;
