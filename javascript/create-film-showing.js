const createFilmShowingButton = document.getElementById('createFilmShowingModalButton')

async function fetchDataByUrl(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

addEventListenerToCreateFilmShowing()



let movieData = null




//adder event så listen af film bliver loadet ind og gemt i et array
function addEventListenerToCreateFilmShowing(){

createFilmShowingButton.addEventListener('click', addDataToCreateFilmContainer =  (e) => {
    
    const filmContainer = document.querySelector('.createFilmShowingContainer')
    fetchDataByUrl('http://localhost:8080/api/film/all').then(data =>{
        console.log(data)
        // for at tømme containeren inden vi adder alle elementerne
        filmContainer.innerHTML = ''
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('div')
            card.classList.add('createFilmShowingCard')
            filmContainer.appendChild(card)
            const imgPoster = document.createElement('img')
            imgPoster.src = data[i].poster
            imgPoster.style.width = "100%"
            card.appendChild(imgPoster)

            
            imgPoster.addEventListener('click', (e) => {
                const titleInput = document.getElementById('createFilmName')
                titleInput.setAttribute('value',data[i].title)
                movieData = {id:data[i].id,
                    title:data[i].title,
                    genre:data[i].genre,
                    rated:data[i].rated,
                    lengthInMinutes:data[i].lengthInMinutes,
                    description:data[i].description,
                    poster:data[i].poster,
                    actors:data[i].actors
                    
                }
                
            })

        }

        

        
    })
})

}






        
const createFilmShowingConfirmButton = document.getElementById('createFilmShowingConfirmButton')



createFilmShowingConfirmButton.addEventListener('click', (e) => {

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/addFilmShowing")

    request.setRequestHeader("Accept", "application/json");

    // UTF-08 ER MEGA VIGTIG HVIS DET SKAL VIRKE!!!!!!!!!!!!!
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const createFilmLength = document.getElementById('createFilmLength')
    const createFilmRoom = document.getElementById('createFilmRoom')
    const createFilmTicketPrice = document.getElementById('createFilmTicketPrice')
      

    let movieShowingData = `{
        "length": ${JSON.parse(createFilmLength.value)},
        "film": ${JSON.stringify(movieData)},
        "room": ${JSON.stringify(createFilmRoom.value)},
        "price": ${JSON.parse(createFilmTicketPrice.value)}
        }`;

    
    
    request.send(movieShowingData);

        //det her er ikke kønt. Erstat med noget await async ????
    setTimeout( () => {
        refreshFilmShowingContainer()
    },300)
    

   
})


