const characters = document.querySelector('#characters');
const pagination = document.querySelector('#pagination');
let page = 1;


const goToTop = () => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
};


const loadingCards = () => {
  const loading = document.createElement('div');
  loading.innerHTML = `
  <div class="spinner-border spinner_style w-full p-5 mt-5 fs-1" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  `;
  return loading;
};

const getData = async (url) => {
  const loading = loadingCards();
  characters.append(loading);
  const response = await fetch(url);
  const data = await response.json();
  characters.removeChild(loading);
  return data;
}

(async () => {
  let dataApi = await getData('https://rickandmortyapi.com/api/character');
  dataApi.results.forEach(element => {
    const character = createCard(element.name, element.image, element.species, element.gender, element.origin);
    
    characters.append(character);
  });

  // Botones
  const buttonRight = document.createElement('button');
  buttonRight.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  buttonRight.className = 'btn_next_prev';
  
  const buttonLeft = document.createElement('button');
  buttonLeft.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  buttonLeft.className = 'btn_next_prev';

  buttonRight.addEventListener('click', async () => {
    page++;
    chequearPagina(page, buttonLeft, buttonRight); 
    goToTop();
    characters.innerHTML = '';
    dataApi = await getData(dataApi.info.next);
    dataApi.results.forEach(element => {
      const character = createCard(element.name, element.image, element.species, element.gender, element.origin);
      
      characters.append(character);
    });
  });

  
  buttonLeft.addEventListener('click', async () => {

    if (page > 0) { 
      page--;
    }

    chequearPagina(page, buttonLeft, buttonRight); 
    goToTop();
    characters.innerHTML = '';
    dataApi = await getData(dataApi.info.prev);
    dataApi.results.forEach(element => {
      const character = createCard(element.name, element.image, element.species, element.gender, element.origin);
      
      characters.append(character);
    });
  });

  pagination.append(buttonLeft); 
  pagination.append(buttonRight); 

  chequearPagina(page, buttonLeft, buttonRight); 


  function chequearPagina(numeroPagina, botonLeft, botonRight) {
    
    if (numeroPagina === 1) {
      botonLeft.setAttribute('disabled', true);
    } else {
      botonLeft.removeAttribute('disabled');
    }

    if (numeroPagina === dataApi.info.pages) {
      botonRight.setAttribute('disabled', true);
    } else {
      botonRight.removeAttribute('disabled');
    }
  }

})();

const createCard = (name, image, species, gender, origin) => {

  const card = document.createElement('div');
  card.className = 'animate__animated animate__zoomIn animate_faster'
  card.innerHTML =
    `
  <div class="card_character card" style="width: 18rem; height:500px">
  <img src="${image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title text-white fw-bold">${name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Especie: ${species}</li>
    <li class="list-group-item">Género: ${gender}</li>
    <li class="list-group-item">Origen: ${origin.name}</li>
  </ul>
</div>
  `;
  return card;
};