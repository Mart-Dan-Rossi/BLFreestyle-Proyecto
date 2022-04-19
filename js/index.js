const integrantesJSON = "../editar/integrantes.json";
const fotosJSON = "../editar/galeriaFotos.json";
const videosJSON = "../editar/galeriaVideos.json";

const galeriaVideos = document.querySelector(".galeria__vidoes__contenedor");
const contenedorIntegrantes = document.querySelector('.quienessomos__integrantesbl__contenedor');
const galeriaFotos = document.querySelector(".galeria__fotos__contenedor");
const templateIntegrantes = document.getElementById("template-card-integrante").content;

const fragment = document.createDocumentFragment();


const renderizarIntegrantes = (integrantes) => {
    
    integrantes.forEach((integrante) => {
        const {
            nombreCompleto,
            rolTrabajo,
            instagram,
            linkFoto
        } = integrante;

        const clone = templateIntegrantes.cloneNode(true);

        clone.querySelector('.card__img').src = linkFoto;
        clone.querySelector('.card__img').alt = nombreCompleto;
        (rolTrabajo) ? (
            clone.querySelector('.tituloIntegrante').innerHTML = `
                ${ nombreCompleto }
                <small>${rolTrabajo}</small>
            `
        ) : (
            clone.querySelector('.tituloIntegrante').textContent = nombreCompleto
        )
        clone.querySelector('a').href = instagram;
        
        // Se adjuntan cada una de las cards generadas al fragment => Evita el reflow
        fragment.appendChild(clone);

        // Una vez adjuntas todas las cards al fragment, se adjuntan el fragment al documento
        contenedorIntegrantes.appendChild(fragment);
    });
};

const renderizarFotos = (fotos) => {
    
    fotos.forEach((foto) => {
        const { linkFoto } = foto;

        galeriaFotos.innerHTML += `
            <img
                src= ${linkFoto}
            alt="Evento de BL Freestyle"
            />    
        `;
    });
}

const fetchIntegrantes = async()=>{
    try{
        const resp = await fetch(integrantesJSON);
        const integrantes = await resp.json();
        renderizarIntegrantes(integrantes);
    }catch(error) {
        console.log(error);
    };
};

const fetchFotos = async() => {
    try{
        const resp = await fetch(fotosJSON);
        const fotos = await resp.json();
        renderizarFotos(fotos);
    }catch(error) {
        console.log(error);
    }
}

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
};

fetchIntegrantes();
fetchFotos();
insertoVideos();