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

                    <script src="displaySearchResult.js"></script>

                    <form action="index.php" method="GET" autocomplete="off">
                        <label for="job">Job</label>
                        <input type="text" name="job" id="job" onKeyUp="showResults(this.value.toLowerCase())">
                        <div id="result"></div>

                        <script src="convertLower.js"></script>
                    </form>

                    <script src="generateSearch.js"></script>
                </div>

                <div class="col-md-6">
                    <div id="map">
                        <script src="generateMap.js"></script>

                        <script src="generatePoints.js"></script>
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