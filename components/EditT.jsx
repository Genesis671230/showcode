import { Backdrop, CircularProgress } from "@mui/material";
import { sanitize } from "dompurify";
import { useEffect, useState } from "react";


const EditT = ({data}) => {
  const [showCircle, setshowCircle] = useState(true);
useEffect(() => {
  setInterval(()=>{setshowCircle(false)},2000)
}, []);

    console.log(data)
  

  return (
    <div>
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showCircle}

        >
        <CircularProgress color="inherit" />
      </Backdrop>
         <div
        dangerouslySetInnerHTML={{ __html: sanitize(data?.data.code) }}
      ></div>
    </div>
  )
}

export default EditT