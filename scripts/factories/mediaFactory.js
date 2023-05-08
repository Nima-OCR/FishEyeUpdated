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
      img.setAttribute('alt', `Portrait de ${title}`);
      img.setAttribute('data-id', id);
      figure.appendChild(img);
    } else if (video) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('showLightBox');
      videoElement.setAttribute('src', videoPath);
      videoElement.setAttribute('alt', `Vidéo de ${title}`);
      videoElement.setAttribute('controls', true);
      videoElement.setAttribute('data-id', id);
      figure.appendChild(videoElement);
    }


    const figcaption = document.createElement('figcaption');
    figure.appendChild(figcaption);

    const titleElement = document.createElement('h3');
    titleElement.innerHTML = title;
    figcaption.appendChild(titleElement);

    const likesElement = document.createElement('p');
    likesElement.innerHTML = `${likes} `;
    figcaption.appendChild(likesElement);

    const heartIcon = document.createElement('i');
    heartIcon.className = 'fa-regular fa-heart';
    const solidHeartIcon = document.createElement('i');
    solidHeartIcon.className = 'fas fa-heart';
    solidHeartIcon.style.display = 'none';

    const heartContainer = document.createElement('span');
    heartContainer.className = 'heart-container';
    heartContainer.appendChild(solidHeartIcon);
    heartContainer.appendChild(heartIcon);
    likesElement.appendChild(heartContainer);

// Ajoutez cet écouteur d'événements
    heartIcon.addEventListener('click', () => {
      handleHeartClick(likesElement);
    });

    function handleHeartClick(event) {
      const heartContainer = event.target.parentNode;
      const heartIcon = heartContainer.querySelector('.fa-regular.fa-heart');
      const solidHeartIcon = heartContainer.querySelector('.fas.fa-heart');
      const likesElement = heartContainer.parentNode;
      const likeCount = parseInt(likesElement.textContent);

      let updatedLikeCount;

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
      } else {
        currentTotalLikes -= 1;
      }

      totalLikesElement.textContent = currentTotalLikes.toString();
    }


    heartIcon.addEventListener('click', handleHeartClick);

    const heartIcons = document.querySelectorAll('.heart-icon');

    heartIcons.forEach((heart) => {
      heart.addEventListener('click', () => {
        heart.classList.toggle('filled');
      });
    });




    return article;
  }

  return { id, photographerId, title, image, video, likes, getMediCardDOM };

}
