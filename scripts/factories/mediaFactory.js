/**
 * Fonction factory pour créer des objets média
 * @param {Object} data - Un objet contenant des données de média (id, photographerId, title, image, video, likes)
 * @returns {Object} Un objet contenant les données de média et une fonction pour créer et renvoyer les éléments DOM du média
 */
// Fonction qui génère un objet avec ses informations et un élément DOM pour l'afficher
export function mediaFactory(data) {

  const { id, photographerId, title, image, video, likes, date } = data;
  const imagePath = `assets/images/${photographerId}/${image}`;
  const videoPath = `assets/images/${photographerId}/${video}`;


  /**
   Fonction qui crée et renvoie les éléments du DOM pour afficher les médias
   @function getMediCardDOM
   @returns {HTMLElement} Un élément DOM 'article' contenant les informations et les médias.
   */

  function getMediCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('class', 'portfolio');

    const figure = document.createElement('figure');
    article.appendChild(figure);

    // Pour l'image
    if (image) {
      const img = document.createElement('img');
      img.classList.add('showLightBox');
      img.setAttribute('src', imagePath);
      img.setAttribute('alt', `Image ${title}`);
      img.setAttribute('aria-label', `Ouverture de la lightbox pour afficher le média ${title}`)
      img.setAttribute('data-id', id);
      img.setAttribute('tabindex', '0');
      figure.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('showLightBox');
      videoElement.setAttribute('src', videoPath);
      // videoElement.setAttribute('alt', `Vidéo de ${title}`);
      videoElement.setAttribute('aria-label', "Ouverture de la lightbox")
      videoElement.setAttribute('controls', "");
      videoElement.setAttribute('data-id', id);
      videoElement.setAttribute('tabindex', '0');
      figure.appendChild(videoElement);
    }



    const figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);

    const titleElement = document.createElement('h2');
    titleElement.innerHTML = title;
    figcaption.appendChild(titleElement);


    /***********************************************************************
                        Gestions des Likes des médias
     **********************************************************************/

    const likesElement = document.createElement('p');
    likesElement.innerHTML = `${likes} `;
    figcaption.appendChild(likesElement);

    function createHeartIcon(className) {
      const heartIcon = document.createElement('em');
      heartIcon.className = className;
      heartIcon.setAttribute('tabindex', '0');
      heartIcon.setAttribute('aria-label', 'Bouton Like');
      return heartIcon;
    }


    //Crée un conteneur HTML "span" et lui ajoute deux éléments enfants, représentant deux icônes de coeur.
    function createHeartContainer(heartIcon, solidHeartIcon) {
      const heartContainer = document.createElement('span');
      heartContainer.className = 'heart-container';
      heartContainer.appendChild(solidHeartIcon);
      heartContainer.appendChild(heartIcon);
      return heartContainer;
    }

    // Création des classes pour likes des medias
    const heartIcon = createHeartIcon('fa-regular fa-heart');
    const solidHeartIcon = createHeartIcon('fas fa-heart');
    solidHeartIcon.style.display = 'none';

    const heartContainer = createHeartContainer(heartIcon, solidHeartIcon);
    likesElement.appendChild(heartContainer);

    attachHeartIconEvent(heartIcon);

    const heartIcons = document.querySelectorAll('.heart-icon');

    toggleHeartFillOnEvent(heartIcons);


    /**
     * Gère le clic sur une icône de coeur en mettant à jour l'affichage de l'icône
     * et en incrémentant ou décrémentant le compteur de "likes".
     *
     * @param {Event} event - L'objet Event représentant le clic sur l'icône du coeur.
     *
     */
    function handleHeartClick(event) {
      const heartContainer = event.target.parentNode;
      // const heartIcon = heartContainer.querySelector('.fa-regular.fa-heart');
      const solidHeartIcon = heartContainer.querySelector('.fas.fa-heart');
      const likesElement = heartContainer.parentNode;
      const likeCount = parseInt(likesElement.textContent);

      let updatedLikeCount;//utilisée pour stocker le nouveau nombre de "likes".

      if (solidHeartIcon.style.display === 'none') {
        updatedLikeCount = likeCount + 1;
        solidHeartIcon.style.display = 'inline';
      } else {
        updatedLikeCount = likeCount - 1;
        solidHeartIcon.style.display = 'none';
      }

      likesElement.textContent = `${updatedLikeCount} `;
      likesElement.appendChild(heartContainer);

      // Récupérez l'élément affichant le total des likes
      const totalLikesElement = document.querySelector('.total-likes');
      let currentTotalLikes = parseInt(totalLikesElement.textContent);

      // Incrémente ou décrémente le total des likes
      if (solidHeartIcon.style.display === 'inline') {
        currentTotalLikes += 1;
        solidHeartIcon.setAttribute('aria-label', 'likes');
      } else {
        currentTotalLikes -= 1;
        solidHeartIcon.removeAttribute('aria-label');
        solidHeartIcon.setAttribute('alt', 'likes');
      }

      totalLikesElement.textContent = currentTotalLikes.toString();
    }

    function attachHeartIconEvent(heartIcon) {
      heartIcon.addEventListener('click', handleHeartClick);
      heartIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          handleHeartClick(event);
          heartIcon.focus();
        }
      });
    }


    /**
     * Ajoute des gestionnaires d'événements aux icônes de coeur
     *
     * @param {Element[]} heartIcons - l'éléments DOM représentant les icônes de coeur.
     *
     * Cette fonction parcourt chaque icône de coeur et ajoute deux gestionnaires d'événements à chacune
     * Un gestionnaire pour l'événement 'click' ou 'enter' qui alterne la classe 'filled' sur l'icône de coeur.
     */
    function toggleHeartFillOnEvent(heartIcons) {
      heartIcons.forEach((heart) => {
        heart.addEventListener('click', () => {
          heart.classList.toggle('filled');
        });
        heart.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            heart.classList.toggle('filled');
          }
        });
      });
    }

    return article;
  }

  return { id, photographerId, title, image, video, likes, date, getMediCardDOM };
}
