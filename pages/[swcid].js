// import { useState } from "react";
import { Row, Col } from "antd";
import Layout from "../components/Layout";
import WeaknessList from "../components/DetailPage/WeaknessList/";
import MobileWeaknessList from "../components/DetailPage/MobileWeaknessList/";
import Content from "../components/DetailPage/Content/";
import { useRouter } from "next/router";
import definitions from "../export/swc-definition.json";
import styles from "./[swcid].module.css";

export async function getStaticProps() {
  return {
    props: { swcs: definitions },
  };
}

export async function getStaticPaths() {
  const swcs = Object.keys(definitions);

  return {
    paths: swcs.map((swcid) => ({ params: { swcid } })),
    fallback: false,
  };
}

export default function SWC({ swcs }) {
  // const [transferring, setTransferring] = useState(false);
  const router = useRouter();
  const { swcid } = router.query;
  const swcIds = Object.keys(swcs);
  const swc = { id: swcid, ...swcs[swcid] };
  // if (transferring) setTransferring(false);
  return (
    <Layout title={`CertiK SWC Registry - ${swcid}`}>
      <div className="centered-container">
        <Row className={styles["detail-page"]} style={{ paddingTop: 65 }}>
          <Col
            span={0}
            md={6}
            style={{ boxShadow: "1px 4px 1px rgba(0, 0, 0, 0.1)" }}
          >
            <WeaknessList
              swcIds={swcIds}
              // transfer={() => setTransferring(true)}
            />
          </Col>
          <Col span={24} md={18}>
            <Content
              swc={swc}
              // transferring={transferring}
              // transfer={() => setTransferring(true)}
            />
          </Col>
          <MobileWeaknessList swcIds={swcIds} />
        </Row>
      </div>
    </Layout>
  );
}
