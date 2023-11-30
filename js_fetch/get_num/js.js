function get() {
    fetch('http://localhost/api/get_sum_num')
        .then(response => response.json())
        .then(data => {
            document.body.innerHTML = data[0].num
        })
}
 setInterval(get,1000)