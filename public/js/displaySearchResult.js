function searchFor(){
    const urlParams = new URLSearchParams(window.location.search);
    let jobName = urlParams.get('job');
    message = document.getElementById("message");

    if (jobName) {
        jobName = jobName.charAt(0).toUpperCase() + jobName.slice(1);
        message.innerHTML = '<h3> You searched for: ' + jobName + '</h3>';
    }
    else{
        message.innerHTML = '<h3>Search for a job: </h3>';
    }
}

searchFor();