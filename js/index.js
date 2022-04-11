const videosJSON = "./recursos/videos.json"
let galeriaVideos = document.querySelector(".galeria__vidoes__contenedor")

const insertoVideos = ()=>{
    //Traigo el JSON de videos
    fetch(videosJSON)
    .then((response)=>response.json())
    .then((json)=>{
        json.forEach(element => {
            galeriaVideos.innerHTML+= `<iframe src="${element.iframe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>`;
        });
    });
}

insertoVideos();