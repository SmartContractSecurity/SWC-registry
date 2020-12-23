import React, { useState } from "react";
import { Grid, Row, Col, Typography, Spin, Modal } from "antd";
import styles from "./index.module.css";
import HubspotForm from "react-hubspot-form";

const { useBreakpoint } = Grid;
const { Title } = Typography;

const HUBSPOT_PORTAL_ID = "4972390";
const HUBSPOT_FORM_ID = "8f8c08bf-2da2-4fd3-92f6-7d602b6381d0";

export default function Banner({ t }) {
  const screens = useBreakpoint();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles["AppBanner"]}>
      <img src="/dots.svg" alt="dots" className={styles["AppBanner-dots-bg"]} />
      <Row
        align="middle"
        justify="space-between"
        gutter={[0, { xl: 0, sm: 24, xs: 24 }]}
        className={`centered-container ${styles["AppBanner-centered-container"]}`}
      >
        <Col>
          <Title className={styles["banner-title"]}>
            <span style={{ color: "#E1AA4C" }}>{t("CertiK")}</span>
            {t(" SWC Registry")}
          </Title>
          <Title
            level={screens.xs ? 5 : 4}
            style={{
              color: "#fff",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "20px",
              margin: 0,
            }}
          >
            {t("SWC Registry with Security Oracle Extensions")}
          </Title>
        </Col>
        <Col>
          <img
            src="/banner-background.png"
            alt="background"
            className={styles["banner-background"]}
          />
        </Col>
      </Row>
      <Modal
        title="Protect Your Project Today"
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        <HubspotForm
          portalId={HUBSPOT_PORTAL_ID}
          formId={HUBSPOT_FORM_ID}
          onSubmit={() => setShowModal(false)}
          loading={
            <Row justify="center">
              <Spin />
            </Row>
          }
        />
      </Modal>
    </div>
  );
}
