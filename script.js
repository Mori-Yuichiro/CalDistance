var map;
var mapCounter = 0;
var latlngInfo1;
var latlngInfo2;

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

        map.on('click', (markPosition) => {
            console.log(markPosition);
        })
    },
    () => {
        alert('Could not get your position');
    }
);

//Set Marker on the map
const OnMarker = (e) => {
    if (mapCounter <= 1) {
        console.log('Set, marker!');

        const marker = L.marker(e.latlng).addTo(map).on('click', DelMarker)

        marker.bindPopup(`緯度 : ${Math.floor(e.latlng.lat * Math.pow(10,1)) / Math.pow(10,1)}° 経度 : ${Math.floor(e.latlng.lng * Math.pow(10,1)) / Math.pow(10,1)}°`).openPopup();
    }
    if (mapCounter < 2) {
        ++mapCounter;
        console.log('counter:' + mapCounter);
    }

    if(mapCounter === 1) {
        latlngInfo1 = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
    } else if(mapCounter === 2) {
        latlngInfo2 = {
            lat: e.latlng.lat,
            lng: e.latlng.lng
        };
    }
};

//Delete marker when marker is clicked
const DelMarker = (e) => {
    map.removeLayer(e.target);
    //Can't set more than 2 markers
    --mapCounter;
    console.log('counter:' + mapCounter);
};

// ref : https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a
const MeasureDistance = (e) => {
    console.log('Measure Distance!');
    console.log(latlngInfo1);
    console.log(latlngInfo2);

    // measure the distance
    const R = Math.PI / 180;
    const lat1 = latlngInfo1.lat * R;
    const lng1 = latlngInfo1.lng * R;
    const lat2 = latlngInfo2.lat * R;
    const lng2 = latlngInfo2.lng * R;

    const distance = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));

    // show the distance on browser
    const distContent = document.createElement('p');
    distContent.innerHTML = '距離: ' + distance + 'km';
    
    const showDist = document.getElementById('showDistance');
    showDist.appendChild(distContent);

    console.log(distance + ' km');
};