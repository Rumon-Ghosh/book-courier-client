import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Map = () => {

  const { data : centers = [], isLoading } = useQuery({
    queryKey: ['serviceCenter'],
    queryFn: async () => {
      const result = await axios.get('/service.json')
      return result.data
    }
  })
  // console.log(centers)

  const position = [23.6850, 90.3563];

  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div className="w-11/12 mx-auto h-[300px] md:h-[500px] mt-10 mb-30 z-0">
      <h3 className="text-3xl text-center font-bold mb-3">Check Our All Service Centers</h3>
      <p className="text-center mb-10">Explore the locations of all our service centers on the map below.</p>
      <MapContainer
        className="h-full"
        center={position}
        zoom={7}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          centers.map((center, index) =>
            <Marker position={[center?.latitude, center?.longitude]} key={index}>
          <Popup>
            Centers: {center.covered_area.join(', ')}
          </Popup>
        </Marker>)
        }
      </MapContainer>
    </div>
  );
};

export default Map;
