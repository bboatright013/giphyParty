console.log("Let's get this party started!");

const key = '2e2dq60yb3qhSz7hv6VD7l0OzqgXUaPn';

const theForm = $('#searchForm');
const gifZone = $('#gifZone');
const wipeBrd = $('#remove');
const searchBtn = $('#searchGify');



theForm.on('click', function(e){
    e.preventDefault();
})
theForm.on('keydown', function(e) {
    if (e. keyCode == 13) {
    console.log('pressed enter');
    e. preventDefault();
    onSubmit();
    }
    });

searchBtn.on('click', function(){
    console.log('click works');
    onSubmit();
});
wipeBrd.on('click', function(){
    console.log('delete button works');
    wipeTheBrd();
})

async function onSubmit(){
    const thisSearch = document.querySelector('#searchTerm').value.toString();
    const resp = await axios.get("https://api.giphy.com/v1/gifs/search", {params: {api_key: key, q: thisSearch, limit: 1 }});
    if(resp.data.data.length <= 0){
        backupSearch()
        return;
    }
    console.log(resp);
    createNewIMG(resp.data.data[0].images.downsized_large.url)
}
function createNewIMG(response){
    const newIMG = $('<img>');
    newIMG.attr('src', response );
    gifZone.append(newIMG);
    document.querySelector('#searchTerm').value = '';
}

function wipeTheBrd(){
    gifZone.empty();
}

async function backupSearch(somedata){
    const resp = await axios.get("https://api.giphy.com/v1/gifs/random", {params: {api_key: key, limit: 1}})
    createNewIMG(resp.data.data.images.downsized_large.url);
}