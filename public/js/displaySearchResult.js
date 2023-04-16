function searchFor(){
    const urlParams = new URLSearchParams(window.location.search);
    let jobName = urlParams.get('job');

    if (jobName) {
        message = document.getElementById("message");
        jobName = jobName.charAt(0).toUpperCase() + jobName.slice(1);
        message.innerHTML = '<h2> You searched for: ' + jobName + '</h2>';
    } 
}

searchFor();