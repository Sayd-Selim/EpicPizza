import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC<{ key: number }> = (props: { key: number }) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={550}
    viewBox="0 0 280 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="140" r="135" />
    <rect x="0" y="293" rx="10" ry="10" width="278" height="26" />
    <rect x="5" y="346" rx="10" ry="10" width="273" height="88" />
    <rect x="7" y="448" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="449" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
