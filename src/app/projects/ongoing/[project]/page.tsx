import React from "react";

// Using a more compatible way to define Next.js app router pages
export default function OngoingProjectsPage(props: any) {
  const { project } = props.params;
  
  return (
    <main>
      <div>
        <p>project specific page</p>
        <p>Title: {project}</p>
      </div>
    </main>
  );
}
