import Layout from "../components/Layout";
import Banner from "../components/HomePage/Banner";
import SWCSearcher from "../components/HomePage/SWCSearcher";
import SWCCards from "../components/HomePage/SWCCards";

import definitions from "../export/swc-definition.json";

export async function getStaticProps() {
  return {
    props: { swcs: definitions },
  };
}

export default function Home({ swcs }) {
  return (
    <Layout title="CertiK SWC Registry">
      <Banner />
      <SWCSearcher swcs={swcs} />
      <div className="centered-container" style={{ marginTop: 44 }}>
        <SWCCards swcs={swcs} />
      </div>
    </Layout>
  );
}
