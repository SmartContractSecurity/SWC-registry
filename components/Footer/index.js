import React from "react";
import { Grid, Row, Col, List, Typography, Button } from "antd";
import Badge from "../Badge/";
import styles from "./index.module.css";

const { useBreakpoint } = Grid;
const { Paragraph, Text } = Typography;

function Footer({ t }) {
  const screen = useBreakpoint();
  const isMobile = (screen.xs || screen.sm || screen.md) && !screen.lg;
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles["AppFooter"]}>
      <Row
        justify="space-between"
        gutter={[0, isMobile ? 36 : 0]}
        className={styles["AppFooter-inner"]}
      >
        <Col
          span={isMobile ? 24 : null}
          style={{ textAlign: isMobile ? "center" : "start" }}
        >
          <Paragraph
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              margin: "auto",
            }}
          >
            Copyright © {currentYear} by CertiK. All rights reserved.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}

function ListItemRenderer({ name, url }) {
  return (
    <List.Item>
      <a href={url}>{name}</a>
    </List.Item>
  );
}

export default Footer;
