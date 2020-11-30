import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Header from "../components/header";
import Footer from "../components/footer";

import definitions from "../export/swc-definition.json";

export async function getStaticProps() {
  return {
    props: { swcs: definitions }
  };
}

export default function Home({ swcs }) {
  return (
    <div>
      <Head>
        <title>CertiK SWC Registry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header hasHero />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <SWCTable swcs={swcs} />
      </main>

      <Footer />
    </div>
  );
}

const renderers = {
  link: ({ children, href }) => {
    return (
      <a href={href} className="text-indigo-600 hover:text-indigo-900">
        {children}
      </a>
    );
  }
};

export function SWCTable({ swcs }) {
  const swcIDs = Object.keys(swcs).sort().reverse();

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflowHidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Relationships
                  </th>
                </tr>
              </thead>
              <tbody>
                {swcIDs.map((id, idx) => (
                  <tr
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    key={id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Link href={`/${id}`}>
                        <a className="text-indigo-600 hover:text-indigo-900">
                          {id}
                        </a>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {swcs[id].content.Title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ReactMarkdown renderers={renderers}>
                        {swcs[id].content.Relationships}
                      </ReactMarkdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
