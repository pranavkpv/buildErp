import UserHeader from "../../components/UserFrontPage/UserHeader";
import Banner from "../../components/UserFrontPage/Banner";
import ProjectCard from "../../components/UserFrontPage/ProjectCard";
import { useEffect, useState } from "react";
import { getProject } from "../../api/Admin/project";
import Footer from "../../components/UserFrontPage/Footer";

type projectData = {
  _id: string
  project_name: string
  expected_image: string
  finalImage: string
  area: number
  address: string
  status: string
}

function Projects() {
  const [project, setProject] = useState<projectData[]>([])
  const fetchProject = async () => {
    const result = await getProject()
    setProject(result)
  }
  useEffect(() => {
    fetchProject()
  }, [])
  return (
    <div className="bg-gray-50 min-h-screen">
      <UserHeader />
      <Banner />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.filter((element) => element.status === "pending").map((p) => (
              <ProjectCard key={p._id} {...p} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ongoing Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.filter((element) => element.status === "processing").map((p) => (
              <ProjectCard key={p._id} {...p} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Completed Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.filter((element) => element.status === "completed").map((p) => (
              <ProjectCard key={p._id} {...p} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;