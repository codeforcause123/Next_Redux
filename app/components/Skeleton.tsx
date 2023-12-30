import React from "react";
import Skeleton from "@mui/material/Skeleton";
function loadingSkeleton() {
  return (
    <div>
      <Skeleton variant="rectangular" width={210} height={60} />
    </div>
  );
}

export default loadingSkeleton;
