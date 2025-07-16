import BreadCrumb from "@/components/Application/admin/BreadCrumb";
import UploadMedia from "@/components/Application/admin/UploadMedia";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import React from "react";

const breadcrumbData = [
    {href : ADMIN_DASHBOARD, label: 'home'},
    {href : '', label: 'media'},
]
const MediaPage = () => {

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData}/>
      <UploadMedia />
    </div>
  );
};

export default MediaPage;
