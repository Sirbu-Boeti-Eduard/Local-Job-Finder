const defaultLat = 44.432300;
const defaultLong = 26.106000;

const map = L.map('map').setView([defaultLat, defaultLong], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 

function giveLatLong(latitude, longitude){
    const userLat = latitude;
    const userLong = longitude;

    map.setView([userLat, userLong], 17);

    const marker = L.marker([userLat, userLong]).addTo(map);
    marker.bindPopup("You are here").openPopup();
 
}
