import React from "react";
import ContentLoader from "react-content-loader";

const UserPageSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1160}
    height={280}
    viewBox="0 0 1160 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="555" cy="85" r="85" />
    <rect x="470" y="184" rx="0" ry="0" width="169" height="20" />
    <rect x="492" y="211" rx="0" ry="0" width="135" height="15" />
    <rect x="475" y="240" rx="0" ry="0" width="161" height="21" />
  </ContentLoader>
);

export default UserPageSkeleton;
