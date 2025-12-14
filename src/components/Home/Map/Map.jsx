import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

// ✅ FIX LEAFLET MARKER ICON (REQUIRED FOR FIREBASE / VITE)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = () => {
  const { data: centers = [], isLoading } = useQuery({
    queryKey: ["serviceCenter"],
    queryFn: async () => {
      const result = await axios.get("/service.json");
      return result.data;
    },
  });

  // Bangladesh center
  const position = [23.685, 90.3563];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full px-3 md:px-0 mx-auto mt-10">
      <h3 className="text-2xl md:text-3xl text-center font-bold mb-2">
        Our Service Centers
      </h3>
      <p className="text-center text-sm md:text-base mb-6">
        Find BookCourier service locations near you
      </p>

      {/* ✅ RESPONSIVE MAP HEIGHT */}
      <div className="h-70 sm:h-87.5 md:h-125 rounded-xl overflow-hidden shadow">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}      
          dragging={true}
          tap={true}                  
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ✅ SERVICE CENTER PINS */}
          {centers.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup closeButton={true} autoPan={true}>
                <div className="text-sm">
                  <h4 className="font-semibold mb-1">Service Areas</h4>
                  <p className="text-gray-600">
                    {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
