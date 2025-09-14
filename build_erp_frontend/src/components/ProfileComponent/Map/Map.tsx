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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&addressdetails=1&limit=10`
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
    <div className="flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Select Location</h2>
        <button
          type="button"
          onClick={() => {
            if (selectedLocation) {
              setAddress(selectedLocation.name);
              setOnMap(false);
            }
          }}
          disabled={!selectedLocation}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Save Location
        </button>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search location (e.g., Brototype Kochi)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Search
        </button>
      </div>

      <select
        aria-label="select location"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 text-sm sm:text-base"
        onChange={(e) => {
          const loc = [...locations, ...searchResults].find((l) => l.name === e.target.value);
          setSelectedLocation(loc || null);
          setNewLocationName(loc?.name || '');
        }}
        value={selectedLocation?.name || ''}
      >
        <option value="">Select a location</option>
        {locations.map((loc) => (
          <option key={`saved-${loc.lat}-${loc.lng}`} value={loc.name}>
            {loc.name} (Saved)
          </option>
        ))}
        {searchResults.map((loc) => (
          <option key={`search-${loc.lat}-${loc.lng}`} value={loc.name}>
            {loc.name}
          </option>
        ))}
      </select>

      {selectedLocation && (
        <div>
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 mb-2">
            Location Name
          </label>
          <input
            id="locationName"
            type="text"
            placeholder="Enter location name"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
          />
        </div>
      )}

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}
        className="border border-gray-300 shadow-sm"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapViewUpdater location={selectedLocation} />
        {locations.map((loc) => (
          <Marker key={`saved-${loc.lat}-${loc.lng}`} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name} (Saved)</Popup>
          </Marker>
        ))}
        {searchResults.map((loc) => (
          <Marker key={`search-${loc.lat}-${loc.lng}`} position={[loc.lat, loc.lng]}>
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
          className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default MapIntegrationApp;