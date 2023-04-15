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

    <?php include("location.php"); ?>

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
                    
                    <?php 

                        if(isset($_GET['job'])){
                            $tempString = preg_replace('/\s+/', '', $_GET['job']);

                            if(!empty($tempString)){
                                echo "<h2> You searched for: ";
                                echo $_GET['job']; 
                                echo "</h2>";
                            }
                        }
                    ?>
    
                    <form action="index.php" method="GET">
                        <label for="job">Job</label>
                        <input type="text" name="job" id="job">

                    </form>
                </div>

                <div class="col-md-6">
                    <div id="map">
                        <script>
                            const map = L.map('map').setView([44.432300, 26.106000], 19);

                            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                maxZoom: 19,
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            }).addTo(map);

                            async function getData(){
                                try{
                                    const response = await fetch('db/all.json', {cache: "reload"});
                                    const jsonData = await response.json();
                                    
                                    return jsonData;
                                }
                                catch(error){
                                    return getData();
                                }
                            }

                            function addPoints(jobFind) {
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

                            function loadPoints(){
                                if("<?php
                                    if(isset($_GET['job'])){
                                        $tempString = preg_replace('/\s+/', '', $_GET['job']);
                                        if(!empty($tempString))
                                            echo "true";
                                        else
                                            echo "false";
                                    }
                                    else{
                                        echo "false";
                                        $_GET['job'] = '';
                                    }
                                    ?>" === "true")
                                        addPoints("<?php echo $_GET['job']; ?>");
                                    else
                                        displayAll();
                            }

                            loadPoints();

                            //setInterval(loadPoints, 5000); The markers dont get deleted; need to have a viewed[i]

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