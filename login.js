var userLogin = null

async function fetchDataByUrl(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

fetchDataByUrl("http://localhost:8080/get/user/Danieluser").then(data => {
    console.log(data)
})

