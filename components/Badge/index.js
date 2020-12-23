import React from "react";
import { Row } from "antd";

export default function Badge({
  icon,
  size = 20,
  backgroundColor = "#f1f2f3",
  alt = "Badge",
  iconStyle = {},
  ...otherProps
}) {
  const { className, style = {} } = otherProps;
  const classList = ["badge"];
  if (className) classList.push(classList);

  return (
    <Row
      align="middle"
      justify="center"
      {...otherProps}
      className={classList.join(" ")}
      style={{
        backgroundColor,
        borderRadius: "50%",
        height: size,
        width: size,
        ...style,
      }}
    >
      <img src={icon} alt={alt} style={{ width: "50%", ...iconStyle }} />
    </Row>
  );
}
