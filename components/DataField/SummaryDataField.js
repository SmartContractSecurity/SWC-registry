import React from "react";
import { Typography, Statistic } from "antd";
import DataField from "./";

const { Paragraph } = Typography;

export default function SummaryDataField({
  children,
  headerStyle = {},
  label,
  labelStyle = {},
  value,
  valueStyle = {},
  prefix,
  suffix,
  footer,
  contentStyle = {},
  footerStyle = {},
  ...otherProps
}) {
  const { className } = otherProps;
  const classList = ["data-field"];
  if (className) classList.push(className);
  return (
    <DataField
      headerStyle={headerStyle}
      title={label}
      titleStyle={labelStyle}
      contentStyle={contentStyle}
      {...otherProps}
      className={classList.join(" ")}
    >
      {typeof value === "number" ? (
        <Statistic
          value={value}
          valueStyle={{
            color: "#595959",
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: 500,
            ...valueStyle,
          }}
          prefix={prefix}
          suffix={suffix}
        />
      ) : typeof value === "string" ? (
        <Paragraph
          style={{
            color: "#595959",
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: 500,
            ...valueStyle,
          }}
        >
          {value} {suffix}
        </Paragraph>
      ) : (
        value
      )}
      <Paragraph
        style={{
          color: "#333",
          fontFamily: "Roboto",
          fontSize: 16,
          fontWeight: 400,
          opacity: 0.5,
          ...footerStyle,
        }}
      >
        {footer}
      </Paragraph>
    </DataField>
  );
}
