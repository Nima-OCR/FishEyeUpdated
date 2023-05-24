  import {mediaFactory} from "../factories/mediaFactory.js";
  import {photographerMedias} from "./photographerMedias.js";
  import {setTabIndexForElements, updateElementAttributes} from "./accessibility.js";

  let lastActiveElement;
  const modal = document.getElementById("showLightBox");
  const closeButton = document.querySelector(".show-lightbox__close-btn");


  /**
   * Récupère les médias du photographe pour afficher dans la lightbox.
   * @returns Une promesse qui résout avec les médias du photographe.
   */
  async function getPhotographerMedias() {
    return await photographerMedias();
  }


  /**
   * Ouvre la lightbox et désactive les autres éléments interactifs sur la page
   * pour concentrer l'attention de l'utilisateur sur celle-ci.
   */
  export function openLightbox() {
    console.log('Ouverture de la lightbox');
    lastActiveElement = document.activeElement;

    const interactiveElementsOutsideLightbox = document.querySelectorAll('header a, main a, aside a, header button, main button, aside button');
    setTabIndexForElements(interactiveElementsOutsideLightbox, '-1');

    updateElementAttributes(modal, "block", "false", "0", "true", "", "La Modale des photos est ouverte", "");

    modal.focus();// Place le focus sur la lightbox
  }


  /**
   * Ferme la lightbox et réactive les autres éléments interactifs sur la page.
   */
  export function closeLightbox() {
    console.log('Fermeture de la lightbox');

    const interactiveElementsOutsideLightbox = document.querySelectorAll('header a, main a, aside a, header button, main button, aside button');
    setTabIndexForElements(interactiveElementsOutsideLightbox, '0');

    updateElementAttributes(modal, "none", "true", "0", "true", "", "", "");

    if (lastActiveElement) {
      lastActiveElement.focus();//replace le focus sur l'élément actif après la fermeture de la lightbox
    }
  }


  /**
   * si l'élément actif est le bouton de fermeture.
   * Ferme la lightbox en réponse à un événement click ou la touche "Enter"
   */
  function closeLightBoxEvent(event) {
    if (event.type === "click" || (event.type === "keydown" && event.key === "Enter" && document.activeElement === closeButton)) {
      closeLightbox();
      event.preventDefault();
    }
  }


  /**
   * Ajoute des écouteurs d'événements de clic et de touche à un élément.
   * @param {HTMLElement} element - L'élément auquel ajouter les écouteurs d'événements.
   * @param {Function} handler - Le gestionnaire d'événement à appeler lorsqu'un événement se produit.
   */
  function addEventListeners(element, handler) {
    element.addEventListener("click", handler);
    element.addEventListener("keydown", handler);
  }

  // Appel de la fonction addEventListeners avec closeButton et closeLightBoxEvent comme arguments
  addEventListeners(closeButton, closeLightBoxEvent);


  /**
   * les éléments de navigation (chevrons) de la lightbox.
   * @returns {Object} Un objet contenant les éléments de chevron de navigation.
   * @property {HTMLElement} navChevronLeft -chevron de navigation gauche.
   * @property {HTMLElement} navChevronRight -chevron de navigation droite.
   */
  export function getNavChevrons() {
    const navChevronLeft = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-left");
    const navChevronRight = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-right");

    // Définit l'attribut tabindex à 0 pour activer la navigation au clavier avec les chevrons
    navChevronLeft.setAttribute("tabindex", "0");
    navChevronRight.setAttribute("tabindex", "0");

    // Ajouter un aria-label à chaque élément
    navChevronLeft.setAttribute("aria-label", "précédent");
    navChevronRight.setAttribute("aria-label", "suivant");

    return { navChevronLeft, navChevronRight };
  }


  /**
   * Crée un nouveau dans le DOM et le renvoie.
   * Supprime tous les conteneurs existants avant de créer le nouveau.
   * @returns {HTMLElement} Le conteneur nouvellement créé.
   */
  export function createVideoContainer() {
  const videoContainers = document.querySelectorAll('.show-lightbox__nav-image video');
  videoContainers.forEach(container => container.remove());

  const videoContainer = document.createElement('video');
  videoContainer.controls = true;
  videoContainer.style.display = 'none';
  document.querySelector('.show-lightbox__nav-image').appendChild(videoContainer);

  return videoContainer;
  }

  /**
   * Gère les attributs des médias.
   * @param {HTMLElement} mediaElement - L'élément média à gérer.
   * @param {string} removeClass - La classe à supprimer de l'élément média.
   * @param {string} addClass - La classe à ajouter à l'élément média.
   * @param {HTMLElement} container - Le conteneur de l'attribut "src".
   */
  function manageMediaAttributes(mediaElement, removeClass, addClass, container) {
    mediaElement.classList.remove(removeClass);
    mediaElement.classList.add(addClass);
    container.setAttribute('src', mediaElement.getAttribute('src'));
  }


  /**
   * Définit les attributs des médias.
   * @param {Object} mediaItem - L'objet média à traiter.
   * @param {HTMLElement} mediaCard - Le média à modifier.
   * @param {HTMLElement} container - Le conteneur de l'attribut "src".
   */
  export function setMediaAttributes(mediaItem, mediaCard, container) {
    if (mediaItem.image) {
      const img = mediaCard.querySelector('img');
      manageMediaAttributes(img, 'showLightBox', 'lightbox-media', container);
    } else if (mediaItem.video) {
      const video = mediaCard.querySelector('video');
      manageMediaAttributes(video, 'showLightBox', 'lightbox-media', container);
    }
  }


  /**
   * Affiche les médias du photographe.
   * @param {number} clickedImageId - L'ID de l'image cliquée.
   * @returns {Promise<void>}
   */
  export async function displayPhotographerMedias(clickedImageId) {
    const media = await getPhotographerMedias();
    const imagesContainer = document.querySelector('.show-lightbox__nav-image img');

    /**
     * @type {HTMLVideoElement}
     */
    const videoContainer = createVideoContainer();

    let currentIndex = media.findIndex(mediaItem => mediaItem.id === parseInt(clickedImageId));

    /**
     * Met à jour le média du lightbox.
     * @param {number} currentIndex - L'index du média actuel.
     */
    const updateLightboxMedia = (currentIndex) => {
      const mediaItem = media[currentIndex];
      const { getMediCardDOM } = mediaFactory(mediaItem);
      const mediaCard = getMediCardDOM();
      setMediaAttributes(mediaItem, mediaCard, mediaItem.image ? imagesContainer : videoContainer);

      const figcaption = document.querySelector('#lightboxDescription');
      if (figcaption) {
        figcaption.remove();
      }

      const newFigcaption = document.createElement('figcaption');
      newFigcaption.id = "lightboxDescription";
      newFigcaption.textContent = mediaItem.title;
      const figure = document.querySelector('.show-lightbox__nav-image');
      figure.appendChild(newFigcaption);

      if (mediaItem.image) {
        videoContainer.style.display = 'none';
        imagesContainer.style.display = 'block';
      } else if (mediaItem.video) {
        imagesContainer.style.display = 'none';
        videoContainer.style.display = 'block';
      }
    };

    /**
     * Gère l'événement des chevrons.
     * @param {Event} event - L'événement de clic ou de touche.
     */

    const { navChevronLeft, navChevronRight } = getNavChevrons();

    function handleNavChevron(event) {
      // const { navChevronLeft, navChevronRight } = getNavChevrons();

      if (event.type === "click" || (event.key === "Enter" && (document.activeElement === navChevronLeft || document.activeElement === navChevronRight))) {
        if (document.activeElement === navChevronLeft) {
          currentIndex = (currentIndex - 1 + media.length) % media.length;
        } else if (document.activeElement === navChevronRight) {
          currentIndex = (currentIndex + 1) % media.length;
        }
        updateLightboxMedia(currentIndex);

        event.preventDefault();
      }
    }

    [navChevronLeft, navChevronRight].forEach(navChevron => addEventListeners(navChevron, handleNavChevron));

    updateLightboxMedia(currentIndex);
  }
