import React from "react";

interface SkeletonLineProps {
  height?: string;
  width?: string;
}
const SkeletonLine: React.FC<SkeletonLineProps> = ({
  height = "12px",
  width = "100%",
}) => {
  return (
    <div
      className="rounded-md bg-gray-200 animate-pulse mb-4"
      style={{ height, width }}
    ></div>
  );
};
export default SkeletonLine;
