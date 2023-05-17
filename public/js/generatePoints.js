var markers = L.markerClusterGroup();

async function getData(retries, delay){
    try{
        const getRequest = 'JSON/locations/all.json';
        const response = await fetch(getRequest, {cache: "reload"});
        const jsonData = await response.json();
        return jsonData;
    } 
    catch(error){
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return getData(retries - 1, delay);
        } 
        else {
            throw new Error('Failed to fetch data');
        }
    }
}

function addPoints(username, jobFind) {
    getData(3, 1000).then(jsonData =>{
        for (let key in jsonData) {
            const location =  jsonData[key];
            const user = location.username;

            if(user === username)
                continue;
            
            const lat = parseFloat(location.latitude);
            const long = parseFloat(location.longitude);
            const jobName = location.jobName;
            const jobDescription = location.jobDescription;
            const LName = location.lname;
            const FName = location.fname;
            //const stars = location.stars;

            if(jobFind === jobName.toLowerCase()){
                const displayName = LName + " " + FName;
                //const displayStars = stars + "⭐";
                const popUpContent = '<a href="chat?user=' + user + '">' + '<h6>' + jobName + '</h6>' + displayName + " " + '<br>' + jobDescription + '</a>';

                const marker = L.marker([lat, long]);
                marker.bindPopup(popUpContent);
                markers.addLayer(marker);
            }
        }
    })
}

function displayAll(username){
    getData(3, 1000).then(jsonData => {
        for (let key in jsonData) {  
            const location = jsonData[key];
            const user = location.username;

            if(user === username)
                continue;

            const lat = parseFloat(location.latitude);
            const long = parseFloat(location.longitude);
            const jobName = location.jobName;
            const jobDescription = location.jobDescription;
            const LName = location.lname;
            const FName = location.fname;
            //const stars = location.stars;

            const displayName = LName + " " + FName;
            //const displayStars = stars + "⭐";
            const popUpContent = '<a href="chat?user=' + user + '">' + '<h6>' + jobName + '</h6>' + displayName + " "  + '<br>' + jobDescription + '</a>';

            const marker = L.marker([lat, long]);
            marker.bindPopup(popUpContent);
            markers.addLayer(marker);
        }
    })
}

function loadPoints(username) {
    const urlParams = new URLSearchParams(window.location.search);
    const jobFind = urlParams.get('job');

    if (jobFind) {
        addPoints(username, jobFind);
    } 
    else {
        displayAll(username);
    }

    map.addLayer(markers);
}
