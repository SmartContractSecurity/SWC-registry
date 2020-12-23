import React from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function Info({
  children,
  placement = "bottom",
  ...otherProps
}) {
  const { style = {} } = otherProps;
  return (
    <Tooltip
      title={children}
      placement={placement}
      trigger={["click", "hover"]}
    >
      <InfoCircleOutlined
        {...otherProps}
        style={{ cursor: "pointer", ...style }}
      />
    </Tooltip>
  );
}
