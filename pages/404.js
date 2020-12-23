import { useTranslation } from "react-i18next";
import { Row } from "antd";
import Layout from "../components/Layout/";
import ErrorFallback from "../components/ErrorFallback/";

export default function Custom404() {
  const { t } = useTranslation();
  return (
    <Layout title={t("CertiK SWC Registry")}>
      <Row align="middle" justify="center" style={{ minHeight: 625 }}>
        <ErrorFallback />
      </Row>
    </Layout>
  );
}
