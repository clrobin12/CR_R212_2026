// TP4 — Fetch & API
// Complétez ce fichier en suivant les exercices du sujet.

// ===========================================
// TEMPS 1 — JSON local (exercices 1.1 à 1.3)
// ===========================================

const conteneur = document.querySelector('#projets-liste');

async function chargerEtAfficher() {
  // état loading
  conteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('./data.json');

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    afficherProjets(donnees.projets);

  } catch (erreur) {
    conteneur.innerHTML = `<p class="error">Erreur : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

function afficherProjets(projets) {
  conteneur.innerHTML = '';

  projets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');

    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <p>${projet.annee}</p>
      <div>
        ${projet.tags.map(tag => `<span>${tag}</span>`).join('')}
      </div>
    `;

    conteneur.appendChild(carte);
  });
}

chargerEtAfficher();


// ===========================================
// TEMPS 2 — API distante (exercices 2.1 à 2.3)
// ===========================================

const conteneurPays = document.querySelector('#pays-liste');

async function chargerPays() {
  conteneurPays.innerHTML = '<p class="loading">Chargement des pays...</p>';

  try {
    const reponse = await fetch('https://restcountries.com/v3.1/region/europe');

    const pays = await reponse.json();

    console.log(pays);      // tableau complet
    console.log(pays[0]);   // un pays

    conteneurPays.innerHTML = '';

    pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');

      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;

      conteneurPays.appendChild(carte);
    });

  } catch (erreur) {
    conteneurPays.innerHTML = '<p class="error">Impossible de charger les pays.</p>';
    console.error(erreur);
  }
}

// lancer
chargerPays();


// ===========================================
// TEMPS 3 — Recherche + API (exercices 3.1 et 3.2)
// ===========================================

const input = document.querySelector('#recherche');
const conteneurAPI = document.querySelector('#recherche-resultats');

function afficherPays(pays) {
  conteneurAPI.innerHTML = '';

  pays.forEach((p) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');

    carte.innerHTML = `
      <h3>${p.flag} ${p.name.common}</h3>
      <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
      <p>Population : ${p.population.toLocaleString()}</p>
    `;

    conteneurAPI.appendChild(carte);
  });
}

input.addEventListener('input', async () => {
  const terme = input.value.trim();
  
  if (terme.length < 2) {
    conteneurAPI.innerHTML = '<p>Tapez au moins 2 caractères.</p>';
    return;
  }

  conteneurAPI.innerHTML = '<p class="loading">Recherche...</p>';

  try {
    const reponse = await fetch(`https://restcountries.com/v3.1/name/${terme}`);

    
    if (!reponse.ok) {
      conteneurAPI.innerHTML = '<p>Aucun résultat.</p>';
      return;
    }

    const pays = await reponse.json();

    
    afficherPays(pays);

  } catch (erreur) {
    
    conteneurAPI.innerHTML = '<p class="error">Erreur lors de la recherche.</p>';
    console.error(erreur);
  }
});

// ===========================================
// TEMPS 4 — Bonus (exercices 4.1 à 4.3)
// ===========================================

// Votre code ici...
