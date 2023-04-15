<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Find Jobs</title>

    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
        crossorigin=""></script>

    <?php 
        include("data.php"); 
    ?>

</head>
<body>
    <div class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ul class="navigation">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="">Advertise</a></li>
                        <li><a href="">About</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <h1>Find Job Listings Near You</h1>
                    
                    <div id="message"></div>

                    <script>
                        function searchFor(){
                            const urlParams = new URLSearchParams(window.location.search);
                            let jobName = urlParams.get('job');

                            if (jobName) {
                                message = document.getElementById("message");
                                jobName = jobName.toLowerCase();
                                jobName = jobName.charAt(0).toUpperCase() + jobName.slice(1);
                                message.innerHTML = '<h2> You searched for: ' + jobName + '</h2>';
                            } 
                        }

                    searchFor();
                    
                    </script>

                    <form action="index.php" method="GET" autocomplete="off">
                        <label for="job">Job</label>
                        <input type="text" name="job" id="job" onKeyUp="showResults(this.value.toLowerCase())">
                        <div id="result"></div>
                    </form>

                    <script>
                        let search_terms = [];

                        async function getJobs(retries = 3, delay = 1000){
                            try{
                                const response = await fetch('db/jobList.json', {cache: "reload"});
                                search_terms = await response.json();
                            }
                            catch(error){
                                if (retries > 0) {
                                    await new Promise(resolve => setTimeout(resolve, delay));
                                    return getJobs(retries - 1, delay);
                                } 
                                else{
                                    throw new Error('Failed to fetch data');
                                }
                            }
                        }

                        function autocompleteMatch(input) {
                            if (input == '') {
                                return search_terms;
                            }
                            let reg = new RegExp(input)
                            return search_terms.filter(function(term) {
                                term = term.toLowerCase();
                                if (term.match(reg)) {
                                    return term;
                                }
                            });
                        }

                        function showResults(val) {

                            getJobs();

                            res = document.getElementById("result");
                            res.innerHTML = '';
                            let list = '';
                            let terms = autocompleteMatch(val);
                            for (i=0; i<terms.length; i++) {
                                list += '<li>' + terms[i] + '</li>';
                            }
                            res.innerHTML = '<ul>' + list + '</ul>';
                        }
                    </script>

                </div>

                <div class="col-md-6">
                    <div id="map">
                        <script>
                            const map = L.map('map').setView([44.432300, 26.106000], 19);

                            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                maxZoom: 19,
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            }).addTo(map);

                            async function getData(retries = 3, delay = 1000){
                                try{
                                    const response = await fetch('db/all.json', {cache: "reload"});
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

                            function addPoints(jobFind) {
                                getData().then(jsonData =>{
                                    for (let i = 0; i < jsonData.length; i++) {
                                        const location = jsonData[i];
                                        const lat = parseFloat(location.latitude);
                                        const long = parseFloat(location.longitude);
                                        const jobName = location.jobName;

                                        if(jobFind.toLowerCase() === jobName.toLowerCase()){
                                            const marker = L.marker([lat, long]).addTo(map);
                                            marker.bindPopup(jobName);
                                        }
                                    }
                                })
                            }

                            function displayAll(){
                                getData().then(jsonData => {
                                    for (let i = 0; i < jsonData.length; i++) {
                                        const location = jsonData[i];
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

                        </script>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <ul class="navigation">
                        <li>Terms & Conditions</li>
                        <li>Copyright</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>