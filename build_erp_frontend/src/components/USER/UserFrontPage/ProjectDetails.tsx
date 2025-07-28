import { Link, useLocation } from 'react-router-dom';
import UserHeader from '../common/UserHeader';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchExistEstimation } from '../../../api/Admin/Estimation';
import { getStage } from '../../../api/Sitemanager/stageStatus';
import { Calendar } from 'lucide-react';

type specData = {
  spec_name: string;
  description: string;
};

type estimationData = {
  project_id: string;
  spec_id: string;
  specDetails: specData;
};

type StageData = {
  _id: string;
  stage_name: string;
  start_date: string;
  end_date: string;
  stage_amount: number;
  progress: number;
  status_date: string;
};

function DetailProject() {
  const location = useLocation();
  const projectId = location.state?.projectId;
  const projectName = location.state?.projectname;
  const expectedImage = location.state?.expectedImage;
  const area = location.state?.area;
  const address = location.state?.address;
  const description = location.state?.description;

  const [spec, setSpec] = useState<estimationData[]>([]);
  const [image, setImage] = useState<any[]>([]);
  const [stage, setStage] = useState<StageData[]>([]);

  const fetchSpec = async () => {
      const response = await fetchExistEstimation(projectId);
      setSpec(response);
  };

  const fetchStage = async () => {
      const response = await getStage(projectId);
      if (response.success) {
        setStage(response.message);
        let x = [];
        for (let element of response.message) {
          for (let item of element.stage_image) {
            for (let char of item.image) {
              x.push({ date: item.date, url: char });
            }
          }
        }
        setImage(x);
      }
  };

  useEffect(() => {
    fetchSpec();
    fetchStage();
  }, []);

  const calculateProjectProgress = () => {
    if (stage.length > 0) {
      const totalProgress = stage.reduce((sum, num) => sum + num.progress, 0) || 0;
      return (totalProgress / (stage.length * 100)) * 100;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <UserHeader />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${expectedImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent mb-4">
            {projectName}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{address}</p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-sm font-semibold text-white">
              Overall Progress: {calculateProjectProgress().toFixed(1)}%
            </span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-5 -skew-y-2 transform scale-110"></div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent text-center">
            Project Overview
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-slate-300 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed line-clamp-4">{description}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-700 rounded-lg">
              <svg className="w-4 h-4 text-[#04a09c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="text-sm font-semibold text-[#04a09c] dark:text-teal-300">
                {area.toLocaleString()} sqft
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={expectedImage}
              alt={projectName}
              className="rounded-xl shadow-lg w-full max-w-md h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Specification Section */}
      <section className="relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 py-16">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="relative mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-5 -skew-y-2 transform scale-110"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent text-center">
              Specifications
            </h2>
            <div className="mt-4 h-px bg-gradient-to-r from-slate-300 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spec.length > 0 ? (
              spec.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 h-64 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                >
                  <h3 className="text-xl font-semibold text-[#04a09c] dark:text-teal-300 line-clamp-2">
                    {element.specDetails.spec_name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-4 flex-grow">
                    {element.specDetails.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">No Specifications Available</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Specifications for this project are being updated. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-5 -skew-y-2 transform scale-110"></div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent text-center">
            Gallery
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-slate-300 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {image.length > 0 ? (
            image.map((src, index) => (
              <div key={index} className="group relative">
                <img
                  src={src.url}
                  alt={`Project Gallery ${index + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <p className="absolute bottom-2 left-2 text-sm text-white bg-black/50 px-2 py-1 rounded-md">
                  {new Date(src.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">No Images Available</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                The gallery for this project is being updated. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Work Plans Section */}
      <section className="relative bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 py-16">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="relative mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-5 -skew-y-2 transform scale-110"></div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent text-center">
              Work Plans
            </h2>
            <div className="mt-4 h-px bg-gradient-to-r from-slate-300 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stage.length > 0 ? (
              stage.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/90 dark:bg-slate-900/90 rounded-xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 h-44 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-[#04a09c] dark:text-teal-300 line-clamp-1">
                      {element.stage_name}
                    </p>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                      <Calendar className="w-4 h-4 mr-2 text-[#04a09c]" />
                      <span>
                        {new Date(element.start_date).toLocaleDateString()} -{" "}
                        {new Date(element.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-gradient-to-r from-[#04a09c] to-[#22d6d1] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${element.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                    Progress: {element.progress}% | Amount: ₹{element.stage_amount.toLocaleString()}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                  <svg className="w-16 h-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">No Work Plans Available</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Work plans for this project are being updated. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] opacity-5 -skew-y-2 transform scale-110"></div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#04a09c] to-[#22d6d1] bg-clip-text text-transparent text-center">
            Location
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-slate-300 to-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#04a09c] to-[#22d6d1] transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed line-clamp-4">
              {address}
            </p>
            <ul className="mt-4 text-slate-600 dark:text-slate-300 list-disc pl-5 text-sm">
              <li>Proximity to major highways and metro stations</li>
              <li>Close to upscale shopping and entertainment destinations</li>
              <li>Near reputed educational institutions</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.639!2d76.298!3d9.969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTgnMDguMCJOIDc2wrAxNyc0OC4wIkU!5e0!3m2!1sen!2sin!4v1634567890123"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Project Location"
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-r from-[#04a09c] to-[#22d6d1] text-white py-16">
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lg text-white/90 max-w-xl mx-auto mb-6">
            Ready to experience luxury living at {projectName}? Contact us today for more details or to schedule a visit.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:enquiry@assethomes.in"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-teal-200 transition-colors duration-300"
              aria-label="Email us"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8" />
              </svg>
              enquiry@assethomes.in
            </a>
            <a
              href="tel:+919846499999"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-teal-200 transition-colors duration-300"
              aria-label="Call us"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l1 7 4 1 6-6m-5 5l6 6 1-4 7-1V5h-2" />
              </svg>
              +91 98464 99999
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailProject;