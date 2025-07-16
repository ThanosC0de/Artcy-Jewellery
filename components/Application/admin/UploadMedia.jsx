"use client";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { CldUploadWidget } from "next-cloudinary";
import { TiPlus } from "react-icons/ti";

const UploadMedia = ({ isMultiple }) => {
  const handleOnError = (error) => {
    showToast("error", error.statusText);
  };

  const handleOnQueueEnd = async (results) => {
    const files = results.info.files;
    const uploadedFiles = files
      .filter((file) => file.uploadInfo)
      .map((file) => ({
        asset_id: file.uploadInfo.asset_id,
        public_id: file.uploadInfo.public_id,
        secure_url: file.uploadInfo.secure_url,
        path: file.uploadInfo.path,
        thumbnail_url: file.uploadInfo.thumbnail_url,
      }));

    if (uploadedFiles.length > 0) {
    }
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
      onError={handleOnError}
      onQueueEnd={handleOnQueueEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        multiple: isMultiple,
        sources: ["local", "url", "unsplash", "google_drive"],
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            <TiPlus />
            Upload Media
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
export default UploadMedia;
