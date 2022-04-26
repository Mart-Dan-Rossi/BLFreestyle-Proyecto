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
    galeriaFotos.addEventListener('click', agrandarImagenes)
    bodyOverlay.addEventListener('click', escondoOverleyImagen)
    if (!isDesktop) {
        console.log("Si amiwi estoy entrando")
        overlayImgContainer.querySelector("img").addEventListener('click', escondoOverleyImagen)
    }
});


mediaQuery.addEventListener('change', () => {
    controlarEventoImagenes();
    console.log("Emm")
});

burgerButton.addEventListener('click', () => {
    controlarMenu();
});

linkList.forEach((link) => {
    link.addEventListener('click', () => {
        controlarMenu();
    });
});

menuMediaQuery.addEventListener('change', () => {
    if(menuMediaQuery.matches) {
        controlarMenu();
    };
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


const controlarEventoImagenes = () => {
    galeriaFotos.removeEventListener('click', agrandarImagenes)
    galeriaFotos.addEventListener('click', agrandarImagenes)
};

// lógica para agrandar fotos de galería al hacer click
const agrandarImagenes = (e) => {
    if (e.target.classList.contains("galeria-img")){
        const imgSrc = e.target.src
        const imgAlt = e.target.alt
    
        bodyOverlay.classList.add('show-body-overlay');
        overlayImgContainer.querySelector("img").src=imgSrc
        overlayImgContainer.querySelector("img").alt=imgAlt
        if (isDesktop) {
            overlayImgContainer.classList.add("big-screen")
            overlayImgContainer.classList.remove("small-screen")
        } else {
            overlayImgContainer.classList.remove("big-screen")
            overlayImgContainer.classList.add("small-screen")
        }
    }
};


const escondoOverleyImagen = (e) => {
    if (isDesktop){
        (e.target.classList.contains('body-overlay') || e.target.classList.contains('fa-xmark')) && bodyOverlay.classList.remove('show-body-overlay');
    } else if (!isDesktop) {
        (e.target.classList.contains('body-overlay') || e.target == overlayImgContainer.querySelector("img") || e.target.classList.contains('fa-xmark')) && bodyOverlay.classList.remove('show-body-overlay');
        overlayImgContainer.querySelector("img").src="#";
        overlayImgContainer.querySelector("img").alt="espacio para rellenar con una imágen";
    }
};


const renderizarIntegrantes = (integrantes) => {
    let linkFotoPorDefecto = "./public/images/bl-logo.svg"

    integrantes.forEach((integrante) => {
        const {
            nombreCompleto,
            segundoRenglonNombre,
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
        clone.querySelector('.card__img').alt = `Foto de ${nombreCompleto}`
        
        clone.querySelector('.nombreCompleto').innerHTML = `${ nombreCompleto }`
        if (segundoRenglonNombre) {
            clone.querySelector(".segundoRenglonNombre").innerHTML = segundoRenglonNombre
        }
        if (rolTrabajo) {
            clone.querySelector(".rolTrabajo").innerHTML = `${rolTrabajo}`
        }
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
                loading="lazy"
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
            galeriaVideos.innerHTML += `<iframe src="${element.iframe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy">`;
        });
    });
};