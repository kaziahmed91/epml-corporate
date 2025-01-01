import React from "react";
// import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import LocationMap from "@/components/LocationMap/LocationMap";
const ProjectsPage = () => {
  // const info = useQuery({ queryKey: ["todos"], queryFn: fetchProjectsQuery });
  //
  return (
    <div>
      <h1>This is the projects page</h1>
      <Link href="/projects/ongoing">Ongoing</Link>
      <Link href="/projects/upcoming">Upcoming</Link>
      <br />
      <LocationMap />
      <p>hello</p>
    </div>
  );
};

export default ProjectsPage;
