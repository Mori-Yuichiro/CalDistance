console.log('Hello, World!');

navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        const map = L.map('mapid').setView(coords, 13);

        const data = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        data.addTo(map);

        const marker = L.marker(coords).addTo(map)

        marker.bindPopup('A pretty CSS3 popup.<br> Easily customizable.').openPopup();
        console.log('Finish!');
    },
    () => {
        alert('Could not get your position');
    }
);