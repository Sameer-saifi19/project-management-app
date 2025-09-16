"use client"

import React, { useState } from "react";

type Props = {
  params: { id: string };
};

const Projects = ({ params }: Props) => {
  const { id } = params;

  const [activeTab, setActiveTab] = useState("Board");
  return <div>
    <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
  </div>;
};

export default Projects;
