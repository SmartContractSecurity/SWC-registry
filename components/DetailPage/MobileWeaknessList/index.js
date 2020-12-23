import React, { Fragment, useState } from "react";
import { Drawer } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import WeaknessList from "../WeaknessList/";
import styles from "./index.module.css";

export default function MobileWeaknessList({ swcIds, transfer }) {
  const [visible, setVisible] = useState(false);
  return (
    <Fragment>
      <div
        className={styles["mobile-weakness-list-toggler"]}
        onClick={() => setVisible(true)}
      >
        <CaretLeftOutlined />
      </div>
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        closable
      >
        <WeaknessList
          swcIds={swcIds}
          transfer={() => setVisible(false)}
          isMobile={true}
        />
      </Drawer>
    </Fragment>
  );
}
