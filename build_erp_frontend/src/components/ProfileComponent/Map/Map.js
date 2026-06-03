import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});
function MapIntegrationApp({ address, onMap, setOnMap, setSelectedLocation, selectedLocation, setAddress }) {
    if (!onMap)
        return null;
    const [locations, setLocations] = useState([]);
    const [newLocationName, setNewLocationName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(address);
    // Update search query when address prop changes
    useEffect(() => {
        setSearchQuery(address);
    }, [address]);
    // Handle search with Nominatim API
    const handleSearch = async () => {
        if (!searchQuery)
            return;
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=10`);
            const results = response.data.map((item) => ({
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
                name: item.display_name,
            }));
            setSearchResults(results);
            if (results.length > 0) {
                setSelectedLocation(results[0]);
                setNewLocationName(results[0].name);
            }
        }
        catch (error) {
            console.error('Error searching locations:', error);
            setSearchResults([]);
        }
    };
    // Trigger search when searchQuery changes
    useEffect(() => {
        handleSearch();
    }, [searchQuery]);
    // Map view updater
    const MapViewUpdater = ({ location }) => {
        const map = useMap();
        useEffect(() => {
            if (location) {
                map.setView([location.lat, location.lng], 13);
            }
        }, [location, map]);
        return null;
    };
    return (_jsxs("div", { className: "flex flex-col gap-6 bg-white rounded-2xl shadow-xl p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl sm:text-2xl font-bold text-gray-900", children: "Select Location" }), _jsx("button", { type: "button", onClick: () => {
                            if (selectedLocation) {
                                setAddress(selectedLocation.name);
                                setOnMap(false);
                            }
                        }, disabled: !selectedLocation, className: "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200", children: "Save Location" })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("input", { type: "text", placeholder: "Search location (e.g., Brototype Kochi)", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base" }), _jsx("button", { type: "button", onClick: handleSearch, className: "bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200", children: "Search" })] }), _jsxs("select", { "aria-label": "select location", className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 text-sm sm:text-base", onChange: (e) => {
                    const loc = [...locations, ...searchResults].find((l) => l.name === e.target.value);
                    setSelectedLocation(loc || null);
                    setNewLocationName(loc?.name || '');
                }, value: selectedLocation?.name || '', children: [_jsx("option", { value: "", children: "Select a location" }), locations.map((loc) => (_jsxs("option", { value: loc.name, children: [loc.name, " (Saved)"] }, `saved-${loc.lat}-${loc.lng}`))), searchResults.map((loc) => (_jsx("option", { value: loc.name, children: loc.name }, `search-${loc.lat}-${loc.lng}`)))] }), selectedLocation && (_jsxs("div", { children: [_jsx("label", { htmlFor: "locationName", className: "block text-sm font-medium text-gray-700 mb-2", children: "Location Name" }), _jsx("input", { id: "locationName", type: "text", placeholder: "Enter location name", value: newLocationName, onChange: (e) => setNewLocationName(e.target.value), className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm sm:text-base" })] })), _jsxs(MapContainer, { center: [51.505, -0.09], zoom: 13, style: { height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }, className: "border border-gray-300 shadow-sm", children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }), _jsx(MapViewUpdater, { location: selectedLocation }), locations.map((loc) => (_jsx(Marker, { position: [loc.lat, loc.lng], children: _jsxs(Popup, { children: [loc.name, " (Saved)"] }) }, `saved-${loc.lat}-${loc.lng}`))), searchResults.map((loc) => (_jsx(Marker, { position: [loc.lat, loc.lng], children: _jsx(Popup, { children: loc.name }) }, `search-${loc.lat}-${loc.lng}`))), selectedLocation && (_jsx(Marker, { position: [selectedLocation.lat, selectedLocation.lng], children: _jsxs(Popup, { children: ["Selected: ", newLocationName || 'New Location'] }) }))] }), _jsx("div", { className: "flex justify-end gap-4", children: _jsx("button", { type: "button", onClick: () => setOnMap(false), className: "bg-gray-600 hover:bg-gray-700 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors duration-200", children: "Cancel" }) })] }));
}
export default MapIntegrationApp;
