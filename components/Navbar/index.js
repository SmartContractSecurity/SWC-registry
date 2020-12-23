import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Picture } from "react-responsive-picture";
import { Row } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import MobileNavbar from "../MobileNavbar";
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
              href="https://certik.foundation"
              className={styles["Navbar-headline-logo-a"]}
            >
              <Picture
                className={styles["Navbar-headline-logo-img"]}
                alt={t("CertiK Foundation Logo")}
                sources={[
                  {
                    srcSet: "/certik-badge-w.png",
                    media: "(max-width: 767px)",
                  },
                  {
                    srcSet: "/certik-foundation-logo-white.png",
                  },
                ]}
              />
            </a>
          </div>
          <div className={styles["Navbar-headline-product"]}>
            <Link href="/">{t("SWC Registry")}</Link>
          </div>
        </div>
        <div className={styles["Navbar-headline-tools"]}>
          <MenuOutlined
            className={styles["navbar-toggler"]}
            onClick={() => setVisible(true)}
          />
          <MobileNavbar
            visible={visible}
            onClose={() => setVisible(false)}
            t={t}
          />
          <Row align="middle" className={styles["link"]}>
            <a href="https://shield.certik.foundation/">Shield</a>
            <FeatureHighlighter />
          </Row>
          <div className={styles["link"]}>
            <a href="https://explorer.certik.foundation/">Explorer</a>
          </div>
          <div className={styles["link"]}>
            <a href="https://wallet.certik.foundation/">DeepWallet</a>
          </div>
          <div className={styles["link"]}>
            <a href="https://certik.foundation/technology">Technology</a>
          </div>
          <div className={styles["link"]}>
            <a href="https://certik.foundation/blog">Blog</a>
          </div>
        </div>
      </Row>
    </div>
  );
}
