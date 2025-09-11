import { useLocation } from 'react-router-dom';
import UserHeader from '../common/UserHeader';
import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { fetchExistEstimationInUser, getStageInUser } from '../../../api/auth';

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

interface Location {
  lat: number;
  lng: number;
  name: string;
}

type prop = {
  latitude: number;
  longitude: number;
};

type imageType = {
  date:Date
  url:string
}

function DetailProject() {
  const location = useLocation();
  const projectId = location.state?.projectId;
  const projectName = location.state?.projectname;
  const expectedImage = location.state?.expectedImage;
  const area = location.state?.area;
  const address = location.state?.address;
  const description = location.state?.description;
  const latitude = location.state?.latitude;
  const longitude = location.state?.longitude;

  const [spec, setSpec] = useState<estimationData[]>([]);
  const [image, setImage] = useState<imageType[]>([]);
  const [stage, setStage] = useState<StageData[]>([]);

  const fetchSpec = async () => {
    const response = await fetchExistEstimationInUser(projectId);
    setSpec(response.data);
  };

  const fetchStage = async () => {
    const response = await getStageInUser(projectId);
    if (response.success) {
      setStage(response.data);
      let x = [];
      for (let element of response.data) {
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

  const MapViewUpdater = ({ latitude, longitude }: prop) => {
    const map = useMap();
    useEffect(() => {
      if (latitude && longitude) {
        map.setView([latitude, longitude], 13);
      }
    }, [latitude, longitude, map]);
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={expectedImage}
            alt={projectName}
            className="w-full h-full object-cover transition-all duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            {projectName}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">{address}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-sm font-semibold text-white">
              Overall Progress: {calculateProjectProgress().toFixed(1)}%
            </span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-center">
            Project Overview
          </h2>
          <div className="mt-3 h-px bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 text-base leading-relaxed">{description}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-lg">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="text-sm font-medium text-blue-600">
                {area.toLocaleString()} sqft
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={expectedImage}
              alt={projectName}
              className="rounded-lg shadow-md w-full max-w-md h-64 object-cover transition-all duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Specification Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-50 py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-center">
              Specifications
            </h2>
            <div className="mt-3 h-px bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spec.length > 0 ? (
              spec.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-lg shadow-md border border-gray-200 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  <h3 className="text-lg font-semibold text-blue-600 line-clamp-2">
                    {element.specDetails.spec_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-4 flex-grow">
                    {element.specDetails.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">No Specifications Available</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Specifications for this project are being updated. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-center">
            Gallery
          </h2>
          <div className="mt-3 h-px bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {image.length > 0 ? (
            image.map((src, index) => (
              <div key={index} className="group relative">
                <img
                  src={src.url}
                  alt={`Project Gallery ${ index + 1 }`}
                  className="w-full h-60 object-cover rounded-lg shadow-md transition-all duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="absolute bottom-2 left-2 text-xs text-white bg-black/60 px-2 py-1 rounded-md">
                  {new Date(src.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">No Images Available</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                The gallery for this project is being updated. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Work Plans Section */}
      <section className="relative bg-gradient-to-br from-gray-100 to-gray-50 py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-center">
              Work Plans
            </h2>
            <div className="mt-3 h-px bg-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stage.length > 0 ? (
              stage.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-lg shadow-md border border-gray-200 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-lg font-semibold text-blue-600 line-clamp-1">
                      {element.stage_name}
                    </p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>
                        {new Date(element.start_date).toLocaleDateString()} -{" "}
                        {new Date(element.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-500 w-[${ element.progress }%]`}
                    />

                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Progress: {element.progress}% | Amount: ₹{element.stage_amount.toLocaleString()}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">No Work Plans Available</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Work plans for this project are being updated. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent text-center">
            Location
          </h2>
          <div className="mt-3 h-px bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <p className="text-gray-600 text-base leading-relaxed">{address}</p>
            <ul className="mt-4 text-gray-600 list-disc pl-5 text-sm">
              <li>Proximity to major highways and metro stations</li>
              <li>Close to upscale shopping and entertainment destinations</li>
              <li>Near reputed educational institutions</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ height: '320px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}
              className="border border-gray-200 shadow-md"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapViewUpdater latitude={latitude} longitude={longitude} />
              <Marker position={[latitude, longitude]}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Get in Touch</h2>
          <p className="text-base text-white/90 max-w-xl mx-auto mb-6">
            Ready to experience luxury living at {projectName}? Contact us today for more details or to schedule a visit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:enquiry@assethomes.in"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm font-medium text-white hover:text-blue-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email us"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8" />
              </svg>
              enquiry@assethomes.in
            </a>
            <a
              href="tel:+919846499999"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm font-medium text-white hover:text-blue-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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