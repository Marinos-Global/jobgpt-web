import { useEffect, useState } from "react";
import { Dropzone } from "./dropzone";
import axios from "axios";

interface UploadFileProps {
    onFileUploaded:(file: File)=>void
}

export default function UploadFile({onFileUploaded}:UploadFileProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  useEffect(()=>{
    if(uploadedFiles.length>0)
    axios.get(uploadedFiles[0], { responseType: 'blob' }).then(response => {
        onFileUploaded(new File([response.data], "uploaded-cv.pdf"));       
    });
  },[onFileUploaded,uploadedFiles])
  return (
    <Dropzone
      onChange={setUploadedFiles}
      className="w-full"
      fileExtension=".pdf"
    />
  );
}