import React from "react";

export function ProfilePic(props) {
  const image = props.image || "./avatar.png";
  return (
    <div className="profilepicBox">
      <img onClick={props.showUploader} src={image} />
    </div>
  );
}
