import React from "react";
import Head from "next/head";
import Navbar from "../Navbar/";
import Footer from "../Footer/";
import { useTranslation } from "react-i18next";

export default function Layout({ children, title }) {
  const { t } = useTranslation();
  const childrenWithProps = React.Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { t });
    }
    return child;
  });

  return (
    <div className="App">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar t={t} />
      {childrenWithProps}
      <Footer t={t} />
    </div>
  );
}
