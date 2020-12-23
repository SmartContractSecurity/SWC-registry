import React from "react";
import { Row } from "antd";
import styles from "./index.module.css";

export default function FeatureHighligher() {
  return (
    <Row
      align="middle"
      justify="center"
      className={styles["feature-highlighter"]}
    >
      <div className={styles["spinner"]} />
      <div className={styles["spinner-outer"]} />
    </Row>
  );
}
