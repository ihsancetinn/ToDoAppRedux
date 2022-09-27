import React from "react";
import ContentList from "./ContentList";
import ContentFooter from "./ContentFooter";
import ContentHeader from "./ContentHeader";

const Content = () => {
  return (
    <>
      <section className="main">
        <ContentHeader />
        <ContentList />
        <ContentFooter />
      </section>
    </>
  );
};

export default Content;
