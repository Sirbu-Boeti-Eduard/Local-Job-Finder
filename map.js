
const map = L.map('map').setView([44.432300, 26.106000], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addPoints(jobFind) {

    if(jobFind === "")
        return;

    async function getData(){
        const response = await fetch('./db/locations/all.json', {cache: "reload"});
        const jsonData = await response.json();
        
        return jsonData;
    }
  
    getData().then(jsonData =>{

        for (let i = 0; i < jsonData.length; i++) {
        
            const location = jsonData[i];
            const lat = parseFloat(location.latitude);
            const long = parseFloat(location.longitude);
            const jobName = location.jobName;
    
            if(jobFind === jobName){

                const marker = L.marker([lat, long]).addTo(map);

                marker.bindPopup(jobName);

            }
        }
    })
}


  