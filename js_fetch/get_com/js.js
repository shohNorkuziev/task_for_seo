function get(){
fetch('http://localhost/api/add_last_comment')
.then(response=>response.json())
.then(data=>{
    document.body.innerHTML = data[0].comment
})
}

setInterval(get,1000)