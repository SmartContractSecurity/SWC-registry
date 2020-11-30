import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Header from "../../components/header";
import Footer from "../../components/footer";

import definitions from "../../export/swc-definition.json";

export default function SWC() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>CertiK Security Oracle SWC Registry</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
        <SWCDetail id={id} />
      </main>

      <Footer />
    </div>
  );
}

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dark} language={language} children={value} />
    );
  },
  link: ({ children, href }) => {
    return (
      <a href={href} className="text-indigo-600 hover:text-indigo-900">
        {children}
      </a>
    );
  }
};

function SWCDetail({ id }) {
  const { content } = definitions[id];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{id}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Definition and remediation
        </p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {content.Title}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Relationships</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ReactMarkdown renderers={renderers}>
                {content.Relationships}
              </ReactMarkdown>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ReactMarkdown renderers={renderers}>
                {content.Description}
              </ReactMarkdown>
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Remediation</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ReactMarkdown renderers={renderers}>
                {content.Remediation}
              </ReactMarkdown>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
