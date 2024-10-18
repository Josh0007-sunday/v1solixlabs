import React from "react";

const TrendingProjects = () => {
  const projects = [
    { id: 1, name: "Project Alpha", logo: "🚀", change: "+5.2%" },
    { id: 2, name: "Beta Chain", logo: "⛓️", change: "+3.8%" },
    { id: 3, name: "Gamma Protocol", logo: "🔮", change: "+2.1%" },
  ];

  return (
    <div>
      <div className="space-y-4 mb-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{project.logo}</span>
              <span className="font-semibold">{project.name}</span>
              {project.id === 1 && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-xs font-bold rounded-full">
                  HOT
                </span>
              )}
            </div>
            <span className="text-green-500">{project.change}</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        See More
      </button>
    </div>
  );
};

export default TrendingProjects;
