async function getData(jobFind, retries, delay){
    try{
        const getRequest = 'data.php?job=' + jobFind;
        const response = await fetch(getRequest, {cache: "reload"});
        const jsonData = await response.json();
        return jsonData;
    } 
    catch(error){
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return getData(jobFind, retries - 1, delay);
        } 
        else {
            throw new Error('Failed to fetch data');
        }
    }
}

function addPoints(jobFind) {
    getData(jobFind, 3, 1000).then(jsonData =>{
        for (let key in jsonData) {
            const location =  jsonData[key];
            const lat = parseFloat(location.latitude);
            const long = parseFloat(location.longitude);
            const jobName = location.jobName.toLowerCase();

            if(jobFind === jobName){
                const marker = L.marker([lat, long]).addTo(map);
                marker.bindPopup(jobName);
            }
        }
    })
}

function displayAll(){
    getData("").then(jsonData => {
        for (let key in jsonData) {
            const location = jsonData[key];
            const lat = parseFloat(location.latitude);
            const long = parseFloat(location.longitude);
            const jobName = location.jobName;

            const marker = L.marker([lat, long]).addTo(map);
            marker.bindPopup(jobName);

        }
    })
}

function loadPoints() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobName = urlParams.get('job');

    if (jobName) {
        addPoints(jobName);
    } 
    else {
        displayAll();
    }
}

loadPoints();