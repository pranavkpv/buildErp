import { useLocation } from 'react-router-dom';
import UserHeader from '../common/UserHeader';
import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Cpu, 
  Activity, 
  HardHat, 
  Maximize2, 
  MapPin, 
  Mail, 
  Phone, 
  Image as ImageIcon 
} from 'lucide-react';
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

type prop = {
  latitude: number;
  longitude: number;
};

type imageType = {
  date: Date;
  url: string;
};

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
      let x: imageType[] = [];
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500 selection:text-white">
      <UserHeader />

      {/* Structural Stripe Indicator */}
      <div className="h-1.5 w-full"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, #f97316, #f97316 10px, #1e293b 10px, #1e293b 20px)` }}
      />

      {/* Hero Panoramic Console View */}
      <section className="relative h-[65vh] overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-slate-950">
          <img
            src={expectedImage}
            alt={projectName}
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
              {projectName}
            </h1>
            <div className="flex items-start gap-2.5 text-slate-400 font-medium text-base md:text-lg">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Deployment Metrics: {calculateProjectProgress().toFixed(1)}% Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-orange-500" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                System Overview / Description
              </h2>
            </div>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium">
              {description}
            </p>
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl">
                <Maximize2 className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  {area?.toLocaleString()} SQFT Total Footprint
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl w-full max-w-md group overflow-hidden">
              <img
                src={expectedImage}
                alt={projectName}
                className="rounded-xl w-full h-64 object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Structural Specification Section */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-12">
            <Cpu className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              Schematic Specifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spec.length > 0 ? (
              spec.map((element, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all duration-300 shadow-md"
                >
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-white uppercase tracking-tight line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
                      {element.specDetails.spec_name}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-4">
                      {element.specDetails.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                <Cpu className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">No Component Matrix Available</h3>
                <p className="text-xs text-slate-500">Specifications are being calculated for this database entry.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Telemetry Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 justify-center mb-12">
          <ImageIcon className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Site Manifest Gallery
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {image.length > 0 ? (
            image.map((src, index) => (
              <div key={index} className="group relative bg-slate-900 border border-slate-800 p-2 rounded-2xl overflow-hidden shadow-md">
                <div className="relative overflow-hidden h-60 rounded-xl bg-slate-950">
                  <img
                    src={src.url}
                    alt={`Telemetry frame ${index + 1}`}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
                    <span className="font-mono text-[10px] font-bold text-slate-400 tracking-wider">
                      LOG_DT: {new Date(src.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
              <ImageIcon className="w-10 h-10 text-slate-700 mx-auto mb-4" />
              <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">Visual Log Corrupted or Empty</h3>
              <p className="text-xs text-slate-500">No telemetry logs submitted for this asset file.</p>
            </div>
          )}
        </div>
      </section>

      {/* Work Pipeline Stages Section */}
      <section className="bg-slate-900/40 border-y border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 justify-center mb-12">
            <HardHat className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider">
              Work Deployment Roadmap
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stage.length > 0 ? (
              stage.map((element, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-slate-700 transition-all duration-300 shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <p className="text-base font-bold text-white uppercase tracking-tight line-clamp-1">
                        {element.stage_name}
                      </p>
                      <div className="flex items-center text-xs font-mono font-bold text-slate-400 shrink-0">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
                        <span>
                          {new Date(element.start_date).toLocaleDateString()} — {new Date(element.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Linear Engine Progress Track */}
                    <div className="space-y-2">
                      <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${element.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-400">
                        <span>STAGE METRIC: {element.progress}%</span>
                        <span className="text-white">VAL: ₹{element.stage_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                <HardHat className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                <h3 className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">No Active Milestones Scheduled</h3>
                <p className="text-xs text-slate-500">Roadmap sequencing files have not been mapped for this environment node.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Geolocation Coordinate Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 justify-center mb-12">
          <MapPin className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">
            Site Coordinates & Mapping
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-slate-300 font-medium text-base leading-relaxed">{address}</p>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 text-xs font-mono text-slate-400 font-semibold uppercase tracking-wide">
              <div className="flex items-center gap-2 text-slate-300 border-b border-slate-800 pb-2 mb-2">
                <span>Infrastructure Features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                <span>Proximity to logistics highways & transport infrastructure hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                <span>Zoned inside secure multi-tier utility networks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                <span>Coordinates certified by engineering registries</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 w-full">
            <div className="p-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl h-80 overflow-hidden relative z-10">
              <MapContainer
                center={[latitude, longitude]}
                zoom={13}
                style={{ height: '100%', width: '100%', borderRadius: '12px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <MapViewUpdater latitude={latitude} longitude={longitude} />
                <Marker position={[latitude, longitude]}>
                  <Popup>{address}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Interface Communication Center Footer Link */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Initiate Communications</h2>
          <p className="text-sm md:text-base text-orange-50/90 max-w-xl mx-auto font-medium leading-relaxed">
            Ready to examine engineering modules or orchestrate an environmental review at {projectName}? Interconnect with our dispatch terminal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a
              href="mailto:enquiry@assethomes.in"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-slate-950/40 hover:bg-slate-950/60 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white border border-white/10 transition-all duration-300 backdrop-blur-sm"
              aria-label="Email support interface"
            >
              <Mail className="w-4 h-4 text-yellow-400" />
              enquiry@assethomes.in
            </a>
            <a
              href="tel:+919846499999"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-slate-950/40 hover:bg-slate-950/60 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white border border-white/10 transition-all duration-300 backdrop-blur-sm"
              aria-label="Call support line terminal"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              +91 98464 99999
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailProject;