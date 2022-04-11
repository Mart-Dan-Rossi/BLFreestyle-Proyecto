const videosJSON = "./editar/videos.json";
const integrantesJSON = "./editar/integrantes.json";

let galeriaVideos = document.querySelector(".galeria__vidoes__contenedor");
let contenedorIntegrantes = document.querySelector(".integrantesbl__card");

const insertoVideos = ()=>{
    //Traigo el JSON de videos
    fetch(videosJSON)
    .then((response)=>response.json())
    .then((json)=>{
        //Corro esta función que va a crear e imprimir los elementos iframe en el HTML en el lugar que corresponde
        json.forEach(element => {
            galeriaVideos.innerHTML+= `<iframe src="${element.iframe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>`;
        });
    });
}

const insertoIntegrantes = ()=>{
    //Traigo el JSON de videos
    fetch(videosJSON)
    .then((response)=>response.json())
    .then((json)=>{
        //Corro esta función que va a crear e imprimir los elementos de los integrantes en el HTML en el lugar que corresponde
        json.forEach(element => {
            galeriaVideos.innerHTML+= `<div class="integrantesbl__card">
            <img class="card__img"
              src="link acá!"
              alt="Francisco Langge" />
            <div class="integrantesbl__card--contenido">
              <p class="tituloIntegrante">
                Francisco Langge
                <small>Director General</small>
              </p>
              <a href="https://www.instagram.com/franlangge/" target="_blank">
                <i class="fa-brands fa-instagram card__icon"></i>
              </a>
            </div>
          </div>`;
        });
    });
}

insertoVideos();