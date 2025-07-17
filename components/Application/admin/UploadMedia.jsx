import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { showToast } from "@/lib/showToast";

const UploadMedia = ({ isMultiple }) => {
  const handleOnError = (error) => {
    showToast("error", error.statusText);
  };
  const handleOnQueuesEnd = (results) => {
    console.log(results);
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOnQueuesEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        sources: ["local", "url", "google_drive"],
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            <FiPlus />
            Upload Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;
