var leaflet = L.map('contact-map', {
    center: [10.8065910, 106.7140444],
    zoom: 30
});

// Init Leaflet Map. For more info check the plugin's documentation: https://leafletjs.com/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(leaflet);

// Define Marker Layer
var markerLayer = L.layerGroup().addTo(leaflet);

// Set Custom SVG icon marker
var leafletIcon = L.divIcon({
    html: `<span><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" style="fill: #ffffff80;color: #191e3a;">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx="12" cy="11" r="3"></circle>
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
            </svg></span>`,
    bgPos: [10, 10],
    iconAnchor: [20, 37],
    popupAnchor: [-7, -37],
    className: 'leaflet-marker'
});

// Show current address
L.marker([10.8065910, 106.7140444], { icon: leafletIcon }).addTo(markerLayer).bindPopup('16 E 34th St, NY 10016, US', { closeButton: false }).openPopup();