import Link from "next/link";
import React from "react";

const projects = [
  {
    name: "Project 1",
    address: "123 project place",
    link: "/project-1",
  },
  {
    name: "Project 2",
    address: "2 project place",
    link: "project-2",
  },
  {
    name: "Project 3",
    address: "ffffff project place",
    link: "project-3",
  },
];

const OngoingProjects = () => {
  return (
    <main>
      <h1>Currently Ongoing projects</h1>
      <br />
      <div>
        {projects.map((proj) => (
          <>
            <Link href={`/projects/ongoing/${proj.link}`} key={proj.link}>
              {proj.name}
            </Link>
            <br />
          </>
        ))}
      </div>
    </main>
  );
};

export default OngoingProjects;
