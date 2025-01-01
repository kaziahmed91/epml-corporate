import React from "react";

const OngoingProjectsPage = ({ params }) => {
  return (
    <main>
      <div>
        <p>project specific page</p>
        <p>Title: {params.project}</p>
      </div>
    </main>
  );
};

export default OngoingProjectsPage;
