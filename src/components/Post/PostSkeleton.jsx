import React from "react";
import ContentLoader from "react-content-loader";

const PostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={700}
    height={463}
    viewBox="0 0 700 463"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="698" height="172" />
    <circle cx="48" cy="224" r="24" />
    <rect x="99" y="208" rx="0" ry="0" width="164" height="15" />
    <rect x="99" y="244" rx="0" ry="0" width="231" height="19" />
    <rect x="99" y="285" rx="0" ry="0" width="439" height="33" />
  </ContentLoader>
);

export default PostSkeleton;
