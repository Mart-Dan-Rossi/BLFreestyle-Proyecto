const integrantesJSON = "../editar/integrantes.json";
const fotosJSON = "../editar/galeriaFotos.json";
const videosJSON = "../editar/galeriaVideos.json";

const galeriaVideos = document.querySelector(".galeria__videos__contenedor");
const contenedorIntegrantes = document.querySelector('.quienessomos__integrantesbl__contenedor');
const galeriaFotos = document.querySelector(".galeria__fotos__contenedor");
const templateIntegrantes = document.getElementById("template-card-integrante").content;
const bodyOverlay = document.querySelector('.body-overlay');
const overlayImgContainer = document.querySelector('.img-container');
const navbarLinks = document.querySelector('.navbar__links');
const linkList = document.querySelectorAll('.navbar__links li a');
const burgerButton = document.querySelector('.burger-button');
let menuIsOpen = false;

let mediaQuery = window.matchMedia('(min-width: 770px)');
let isDesktop = mediaQuery.matches;

const menuMediaQuery = window.matchMedia('(max-width: 832px)');

const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
    fetchIntegrantes();
    fetchFotos();
    insertoVideos();
    controlarEventoImagenes(isDesktop);
});


mediaQuery.addEventListener('change', () => {
    (mediaQuery.matches) ? (
        isDesktop = mediaQuery.matches
    ) : (
        isDesktop = mediaQuery.matches
    );

    controlarEventoImagenes(isDesktop);
});

menuMediaQuery.addEventListener('change', () => {
    if(menuMediaQuery.matches) {
        controlarMenu();
    };
});

burgerButton.addEventListener('click', () => {
    controlarMenu();
});

linkList.forEach((link) => {
    link.addEventListener('click', () => {
        controlarMenu();
    });
});


const controlarMenu = () => {
    (menuIsOpen) ? (
        navbarLinks.classList.remove('show-navbar__links'),
        burgerButton.classList.remove('burger-button--toggle')
    ) : (
        navbarLinks.classList.add('show-navbar__links'),
        burgerButton.classList.add('burger-button--toggle')
    )

    menuIsOpen = !menuIsOpen;
};

const controlarEventoImagenes = ( isDesktop ) => {
    (isDesktop) ? (
        galeriaFotos.addEventListener('click', agrandarImagenes)
    ) : (
        galeriaFotos.removeEventListener('click', agrandarImagenes)
    );
};

const prueba = () => { console.log(' Agrandar Imagenes') };

bodyOverlay.addEventListener('click', (e) => {
    (e.target.classList.contains('body-overlay') || e.target.classList.contains('fa-xmark')) && bodyOverlay.classList.remove('show-body-overlay');
});

// lógica para agrandar fotos de galería al hacer click
const agrandarImagenes = (e) => {

    if (e.target.classList.contains('galeria-img')) {
        const imgSrc = e.target.src
        const imgAlt = e.target.alt

        bodyOverlay.classList.add('show-body-overlay');
        overlayImgContainer.innerHTML = `<img src="${ imgSrc }" alt="${ imgAlt }">`;
    }
};

const renderizarIntegrantes = (integrantes) => {
    let linkFotoPorDefecto = "./public/images/bl-logo.png"

    integrantes.forEach((integrante) => {
        const {
            nombreCompleto,
            rolTrabajo,
            instagram,
            linkFoto
        } = integrante;

        const clone = templateIntegrantes.cloneNode(true);

        if (linkFoto == ""){
            clone.querySelector('.card__img').src = linkFotoPorDefecto;
            clone.querySelector('.card__img').style = "object-fit: scale-down"
        }
        else {
            clone.querySelector('.card__img').src = linkFoto;
        }
        clone.querySelector('.card__img').alt = `Foto de ${nombreCompleto}`;
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
                class = "galeria-img"
                src= ${linkFoto}
                alt="Evento de BL Freestyle"
            />    
        `;
    });
}

// RENDERIZACIÓN DE CARDS DE INTEGRANTES
const fetchIntegrantes = async()=>{
    try{
        const resp = await fetch(integrantesJSON);
        const integrantes = await resp.json();
        renderizarIntegrantes(integrantes);
    }catch(error) {
        console.log(error);
    };
};

// RENDERIZACIÓN DE FOTOS GALERÍA
const fetchFotos = async() => {
    try{
        const resp = await fetch(fotosJSON);
        const fotos = await resp.json();
        renderizarFotos(fotos);
    }catch(error) {
        console.log(error);
    }
}

// RENDERIZACIÓN DE VIDEOS GALERÍA
const insertoVideos = ()=>{
    //Traigo el JSON de videos
    fetch(videosJSON)
    .then((response)=>response.json())
    .then((json)=>{
        //Corro esta función que va a crear e imprimir los elementos iframe en el HTML en el lugar que corresponde
        json.forEach(element => {
            galeriaVideos.innerHTML += `<iframe src="${element.iframe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>`;
        });
    });
};