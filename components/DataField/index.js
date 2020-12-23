import React from "react";
import { Row, Col, Typography } from "antd";
import SummaryDataField from "./SummaryDataField";
import Help from "../Help";

const { Paragraph, Text } = Typography;

const isString = (variable) => typeof variable === "string";

const DEFAULT_HEADER_PROPS = {
  align: "middle",
  justify: "space-between",
  gutter: [0, 0],
};

export default function DataField({
  children,
  headerClassName,
  headerStyle = {},
  headerProps = DEFAULT_HEADER_PROPS,
  title,
  titleStyle = {},
  titleColProps = {},
  icon,
  extra,
  extraColProps = {},
  tooltip,
  placement = "bottom",
  contentStyle = {},
  ...otherProps
}) {
  const { className } = otherProps;
  const classList = ["data-field"];
  const headerClassList = ["data-field-header"];
  if (className) classList.push(className);
  if (headerClassName) headerClassList.push(headerClassName);
  return (
    <div {...otherProps} className={classList.join(" ")}>
      <Row
        align={headerProps.align || DEFAULT_HEADER_PROPS.align}
        justify={headerProps.justify || DEFAULT_HEADER_PROPS.justify}
        gutter={headerProps.gutter || DEFAULT_HEADER_PROPS.gutter}
        className={headerClassList.join(" ")}
        style={headerStyle}
      >
        <Col {...titleColProps}>
          <DataTitle title={title} icon={icon} style={titleStyle} />
        </Col>
        {tooltip && (
          <Col>
            <Help
              placement={placement}
              style={{
                color: "rgba(51, 51, 51, 0.5)",
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: "0.02em",
                marginLeft: 4,
              }}
            >
              {tooltip}
            </Help>
          </Col>
        )}
        {extra && (
          <Col {...extraColProps}>
            <DataExtra extra={extra} />
          </Col>
        )}
      </Row>
      <DataContent content={children} style={contentStyle} />
    </div>
  );
}

function DataTitle({ title, icon, ...otherProps }) {
  const { style = {} } = otherProps;
  const textStyle = {
    color: "rgba(51, 51, 51, 0.5)",
    display: "block",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.02em",
    ...style,
  };
  return (
    <Row gutter={[8, 0]}>
      {icon && <Col>{icon}</Col>}
      <Col>
        {isString(title) ? (
          <Text {...otherProps} style={textStyle}>
            {title}
          </Text>
        ) : (
          title
        )}
      </Col>
    </Row>
  );
}

function DataExtra({ extra, ...otherProps }) {
  if (isString(extra)) {
    const { style = {} } = otherProps;
    return (
      <Text {...otherProps} style={style}>
        {extra}
      </Text>
    );
  } else {
    return extra || null;
  }
}

function DataContent({ content, ...otherProps }) {
  const { className, style = {} } = otherProps;
  const classList = ["data-content"];
  if (className) classList.push(className);
  return (
    <div {...otherProps} className={classList.join(" ")}>
      {isString(content) ? (
        <Paragraph
          {...otherProps}
          style={{
            color: style.color || "#0D2150",
            fontSize: style.fontSize || 18,
            fontWeight: style.fontWeight || 500,
          }}
        >
          {content}
        </Paragraph>
      ) : (
        content
      )}
    </div>
  );
}

export { SummaryDataField };
