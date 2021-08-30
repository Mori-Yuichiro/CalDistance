var map;

navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        
        const coords = [latitude, longitude];

        map = L.map('mapid');
        map.setView(coords, 13);

        const data = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        data.addTo(map);

        // Call OnMarker function
        map.on('click', OnMarker);

        console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    },
    () => {
        alert('Could not get your position');
    }
);

//Set Marker on the map
const OnMarker = (e) => {
    console.log('Set, marker!');

    const marker = L.marker(e.latlng).on('click', DelMarker).addTo(map)

    marker.bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
};

//Delete marker when marker is clicked
const DelMarker = (e) => {
    map.removeLayer(e.target);
};