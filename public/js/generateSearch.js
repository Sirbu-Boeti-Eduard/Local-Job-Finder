let search_terms = [];

async function getJobs(val, retries = 3, delay = 1000){
    try{

        const getRequest = 'JSON/search/jobList.json';
        const response = await fetch(getRequest, {cache: "reload"});
        search_terms = await response.json();
    }
    catch(error){
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return getJobs(val, retries - 1, delay);
        } 
        else{
            throw new Error('Failed to fetch data');
        }
    }
}

function autocompleteMatch(input) {
    if (input === '') {
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

    getJobs(val);

    res = document.getElementById("result");
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    for (i=0; i<terms.length; i++) {
        list += '<a href="index?job=' + terms[i].toLowerCase() +'">' + '<li class="results">' + terms[i] + '</li>' + '</a>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}