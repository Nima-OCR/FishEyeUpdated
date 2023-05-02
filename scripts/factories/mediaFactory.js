/**
 * Fonction factory pour créer des objets média
 * @param {Object} data - Un objet contenant des données de média (id, photographerId, title, image, video, likes)
 * @returns {Object} Un objet contenant les données de média et une fonction pour créer et renvoyer les éléments DOM du média
 */
// Fonction qui génère un objet avec ses informations et un élément DOM pour l'afficher
export function mediaFactory(data) {

  const { id, photographerId, title, image, video, likes } = data;
  const imagePath = `/assets/images/${photographerId}/${image}`;
  const videoPath = `/assets/images/${photographerId}/${video}`;

  console.log("Le chemin d'accès à l'image est : " + imagePath);
  console.log("Le chemin d'accès à la vidéo est : " + videoPath);


  /**
   Fonction qui crée et renvoie les éléments du DOM pour afficher les médias
   @function getMediCardDOM
   @returns {HTMLElement} Un élément DOM 'article' contenant les informations et les médias.
   */

  function getMediCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('class', 'portfolio');

    const link = document.createElement('a');
    link.href = '#';
    article.appendChild(link);

    const figure = document.createElement('figure');
    link.appendChild(figure);

    if (image) {
      const img = document.createElement('img');
      img.classList.add('showLightBox');
      img.setAttribute('src', imagePath);
      img.setAttribute('alt', `Portrait de ${title}`);
      figure.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('showLightBox');
      videoElement.setAttribute('src', videoPath);
      videoElement.setAttribute('alt', `Vidéo de ${title}`);
      videoElement.setAttribute('controls', true);
      figure.appendChild(videoElement);
    }

    const figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);

    const titleElement = document.createElement('h3');
    titleElement.innerHTML = title;
    figcaption.appendChild(titleElement);

    const likesElement = document.createElement('p');
    likesElement.innerHTML = `${likes} <i class="fa-regular fa-heart"></i>`;
    figcaption.appendChild(likesElement);

    return article;
  }

  return { id, photographerId, title, image, video, likes, getMediCardDOM };

}
