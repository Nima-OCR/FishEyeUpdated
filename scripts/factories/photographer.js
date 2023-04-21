// Fonction qui génère un objet avec ses informations et un élément DOM pour l'afficher
  export function photographerFactory(data) {

    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    // Fonction qui crée et renvoie les éléments du DOM pour afficher le photographe
    function getUserCardDOM() {
      const article = document.createElement('article');
      article.setAttribute('class', 'photographer-card');

      // Création d'un élément 'a' (lien)
      const link = document.createElement('a');
      link.setAttribute('href', `photographer.html?id=${id}`);
      link.setAttribute('aria-label', `Voir le profil de ${name}`);
      link.setAttribute('tabindex', '0'); // Rendre le lien focusable avec la touche Tab

      // Création d'un élément 'img'
      const portrait = document.createElement('img');
      portrait.setAttribute('src', picture);
      portrait.setAttribute('alt', ''); //todo s'occuper de value
      link.appendChild(portrait);

      // Création d'un élément 'h2' pour le nom du photographe
      const fullName = document.createElement('h2');
      fullName.textContent = name;
      link.appendChild(fullName);

      article.appendChild(link);

      // Création d'un élément 'p' pour la localisation du photographe
      const location = document.createElement('p');
      location.textContent = `${city}, ${country}`;
      article.appendChild(location);

      // Création d'un élément 'span' pour la description du photographe
      const description = document.createElement('span');
      description.textContent = tagline;
      article.appendChild(description);

      // Création d'un élément 'p' pour le prix du photographe
      const priceElement = document.createElement('p');
      priceElement.textContent = `${price}€ / jour`;
      article.appendChild(priceElement);

      // Renvoyer l'élément 'article' complet
      return article;
    }

    // Afficher l'objet de test dans la console
    console.log(data);

    // Renvoyer les objets et la fonction `getUserCardDOM`
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM };
}


