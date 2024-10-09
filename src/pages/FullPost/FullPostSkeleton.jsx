import React from "react";
import ContentLoader from "react-content-loader";

const FullPostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={1160}
    height={385}
    viewBox="0 0 1160 385"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="1160" height="170" />
    <rect x="0" y="200" rx="0" ry="0" width="1160" height="129" />
  </ContentLoader>
);

export default FullPostSkeleton;
