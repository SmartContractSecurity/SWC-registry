import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Picture } from "react-responsive-picture";
import { Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import FeatureHighlighter from "../FeatureHighlighter";
import styles from "./index.module.css";

export default function Navbar({ t }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const classList = [styles["Navbar"]];

  if (router.pathname === "/") {
    classList.push(styles["Navbar-home"]);
  }

  return (
    <div className={classList.join(" ")}>
      <Row justify="space-between" className="centered-container">
        <div className={styles["Navbar-headline-logo-wrapper"]}>
          <div className={styles["Navbar-headline-logo"]}>
            <a
              href="https://www.certik.com"
              className={styles["Navbar-headline-logo-a"]}
            >
              <Picture
                className={styles["Navbar-headline-logo-img"]}
                alt={t("CertiK Logo")}
                sources={[
                  {
                    srcSet: "/certik-badge-w.png"
                  },
                ]}
              />
            </a>
          </div>
          <div className={styles["Navbar-headline-product"]}>
            <Link href="/">{t("CertiK SWC Registry")}</Link>
          </div>
        </div>
      </Row>
    </div>
  );
}
