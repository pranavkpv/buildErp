import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  name: string;
}

interface actualLocation {
  lat: string;
  lon: string;
  display_name: string;
}

interface Prop {
  address: string;
  onMap: boolean;
  setOnMap: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  selectedLocation: Location | null;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

function MapIntegrationApp({ address, onMap, setOnMap, setSelectedLocation, selectedLocation, setAddress }: Prop) {
  if (!onMap) return null;

  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationName, setNewLocationName] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState(address);

  // Update search query when address prop changes
  useEffect(() => {
    setSearchQuery(address);
  }, [address]);

  // Handle search with Nominatim API
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${ encodeURIComponent(
          searchQuery
        ) }&addressdetails=1&limit=10`
      );
      const results = response.data.map((item: actualLocation) => ({
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
        name: item.display_name,
      }));
      setSearchResults(results);
      if (results.length > 0) {
        setSelectedLocation(results[0]);
        setNewLocationName(results[0].name);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    }
  };

  // Trigger search when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // Map view updater
  const MapViewUpdater: React.FC<{ location: Location | null }> = ({ location }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView([location.lat, location.lng], 13);
      }
    }, [location, map]);
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Select Location</h2>
        <button
          type="button"
          onClick={() => {
            if (selectedLocation) {
              setAddress(selectedLocation.name);
              setOnMap(false);
            }
          }}
          disabled={!selectedLocation}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Save Location
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search location (e.g., Brototype Kochi)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Search
        </button>
      </div>

      <select
        aria-label="select location"
        className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 text-sm sm:text-base"
        onChange={(e) => {
          const loc = [...locations, ...searchResults].find((l) => l.name === e.target.value);
          setSelectedLocation(loc || null);
          setNewLocationName(loc?.name || '');
        }}
        value={selectedLocation?.name || ''}
      >
        <option value="">Select a location</option>
        {locations.map((loc) => (
          <option key={`saved-${ loc.lat }-${ loc.lng }`} value={loc.name}>
            {loc.name} (Saved)
          </option>
        ))}
        {searchResults.map((loc) => (
          <option key={`search-${ loc.lat }-${ loc.lng }`} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      {selectedLocation && (
        <div>
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-200 mb-2">
            Location Name
          </label>
          <input
            id="locationName"
            type="text"
            placeholder="Enter location name"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200 text-gray-100 placeholder-gray-400 text-sm sm:text-base"
          />
        </div>
      )}

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}
        className="border border-gray-600"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapViewUpdater location={selectedLocation} />
        {locations.map((loc) => (
          <Marker key={`saved-${ loc.lat }-${ loc.lng }`} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name} (Saved)</Popup>
          </Marker>
        ))}
        {searchResults.map((loc) => (
          <Marker key={`search-${ loc.lat }-${ loc.lng }`} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup>Selected: {newLocationName || 'New Location'}</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => setOnMap(false)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          save
        </button>
      </div>
    </div>
  );
}

export default MapIntegrationApp;