import React, { useEffect } from "react";
import { Drawer } from "antd";
import FeatureHighlighter from "../FeatureHighlighter/";
import styles from "./index.module.css";

export default function MobileNavbar({ visible, onClose, t }) {
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) {
        onClose();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onClose]);

  return (
    <Drawer
      className={styles["MobileNavbar"]}
      title={"Menu"}
      placement={"right"}
      closable={true}
      onClose={onClose}
      visible={visible}
      style={{ height: visible ? "auto" : "0" }}
    >
      <div className={styles["menu"]}>
        <a href="https://shield.certik.foundation" onClick={onClose}>
          {t("Shield")}
          <FeatureHighlighter />
        </a>
        <a href="https://explorer.certik.foundation" onClick={onClose}>
          {t("Explorer")}
        </a>
        <a href="https://wallet.certik.foundation" onClick={onClose}>
          {t("DeepWallet")}
        </a>
        <a
          href="https://certik.foundation/technology"
          className={styles["navbar-link"]}
          onClick={onClose}
        >
          {t("Technology")}
        </a>
        <a href="https://www.certik.foundation/blog" onClick={onClose}>
          {t("Blog")}
        </a>
      </div>
    </Drawer>
  );
}
