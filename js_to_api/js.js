fetch('http://localhost/new_site/get_user')
.then(response=>response.json())
.then(data=>{
    console.log(data);
})