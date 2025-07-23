'use client'
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { CldUploadWidget } from "next-cloudinary";
import { FiPlus } from "react-icons/fi";

const UploadMedia = ({ isMultiple }) => {

  const handleOnError = (error) => {
    showToast("error", error.statusText);
  };

  const handleOnQueueEnd = async (results) => {
    console.log(results);
  };
  
  return (
    <CldUploadWidget
      signatureEndpoint="api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOnQueueEnd}
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
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;

