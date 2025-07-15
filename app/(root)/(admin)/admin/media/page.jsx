import BreadCrumb from "@/components/Application/admin/BreadCrumb";
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
    </div>
  );
};

export default MediaPage;
