function get()
{
    fetch('http://localhost/api/add_last_user')
.then(response=>response.json())
.then(data=>{
    document.body.innerHTML = data[0].name +' ' + data[0].surname
})
}
setInterval(get,1000)