import { CldUploadWidget } from "next-cloudinary";



const UploadMedia = () => {
    const handleOnError = () => {}
  return (
    <CldUploadWidget 
    signatureEndpoint="/api/cloudinary-signature"
    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
    onError={handleOnError}
    onQueuesEnd={handleOnError}

    p
    ></CldUploadWidget>
  );
};

export default UploadMedia;
