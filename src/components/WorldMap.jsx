import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

export default function LiveMap() {
  const mapRef = useRef(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // premium dark
      center: [20, 20],
      zoom: 1.5,
    });

    // Example markers
    const locations = [
      { name: "India", coords: [78.96, 20.59], count: 42 },
      { name: "Japan", coords: [138.25, 36.2], count: 28 },
      { name: "USA", coords: [-98.5, 39.8], count: 35 },
    ];

    locations.forEach((loc) => {
      const el = document.createElement("div");
      el.className = "mapbox-pin";

      new mapboxgl.Marker(el)
        .setLngLat(loc.coords)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<strong>${loc.name}</strong><br/>${loc.count} participants`
          )
        )
        .addTo(mapRef.current);
    });

  }, []);

  return <div ref={mapContainer} className="mapbox-container" />;
}