import React, { useRef, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { BedIcon, CircleCheckBig } from "lucide-react";

// Define the props expected by the Dropzone component
interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: string;
}

// Create the Dropzone component receiving props
export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  // Initialize state variables using the useState hook
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to file input element
  const [fileInfo, setFileInfo] = useState<string | null>(null); // Information about the uploaded file
  const [error, setError] = useState<string | null>(null); // Error message state

  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  // Function to handle file input change event
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  // Function to handle processing of uploaded files
  const handleFiles = (files: FileList) => {

    const uploadedFile = files[0];
    if(!uploadedFile){
        return;
    }
    // Check file extension
    if (
      fileExtension &&
      !fileExtension
        .split(",")
        .some((el) => uploadedFile.name.endsWith(el.trim()))
    ) {
      setError(`Invalid file type. Expected: ${fileExtension}`);
      return;
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024); // Convert to KB

    const fileList = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log(fileList)
    onChange((prevFiles) => [...prevFiles, ...fileList]);

    // Display file information
    setFileInfo(`${uploadedFile.name} (${fileSizeInKB} KB)`);
    setError(null); // Reset error state
  };

  // Function to simulate a click on the file input element
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardContent
        className="p-6 space-y-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <FileIcon className="w-12 h-12" />
          <div className="flex text-sm font-medium text-gray-500">
            <div className="flex">
              <span className="m-auto">Drag and drop a file or</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs text-sm font-medium text-gray-500"
              onClick={handleButtonClick}
            >
              click to browse
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={`${fileExtension}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        {fileInfo && (
          <p className="inline-flex w-full justify-center text-muted-foreground">
            <span className="text-success">
            <CircleCheckBig className="mr-2" />
            </span>
            {fileInfo}
          </p>
        )}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  );
}
interface FileIconProps {
  className: string;
}
function FileIcon(props: FileIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
