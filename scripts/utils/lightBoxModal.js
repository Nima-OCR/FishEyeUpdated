import {mediaFactory} from "../factories/mediaFactory.js";
import {photographerMedias} from "./photographerMedias.js";

let lastActiveElement;


/**
 * Affiche les médias (images et vidéos) du photographe dans une lightbox.
 * @async
 */
async function getPhotographerMedias() {
  return await photographerMedias();
}


    /**
     * Ouvre la fenêtre modale et met à jour les attributs ARIA pour l'accessibilité
     */
    export function openLightbox() {
      console.log('Ouverture de la lightbox');
      const modal = document.getElementById("showLightBox");
      lastActiveElement = document.activeElement;

      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      modal.setAttribute("tabindex", "-1");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("role", "dialog");
      modal.focus();
    }

    /**
     * Ferme la fenêtre modale et met à jour les attributs ARIA pour l'accessibilité
     */
    export function closeLightbox() {
      console.log('Fermeture de la lightbox');
      const modal = document.getElementById("showLightBox");

      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      modal.setAttribute("tabindex", null);
      modal.removeAttribute("aria-modal");
      modal.removeAttribute("role");

      if (lastActiveElement) {
        lastActiveElement.focus();
      }

    }



/**
     * Ferme la fenêtre modale lorsqu'un clic ou l'appui sur la touche "Tab" est détecté
     * @param {Event} event - L'événement déclencheur
     */

    const closeButton = document.querySelector(".show-lightbox__close-btn");


    function closeLightBoxEvent(event) {
      // Vérifie si l'événement est un clic ou si la touche "Entrée" est enfoncée et closeButton est sélectionné
      if (event.type === "click" || (event.type === "keydown" && event.key === "Enter" && document.activeElement === closeButton)) {
        closeLightbox();

        event.preventDefault(); // Empêche l'action par défaut avec la touche Entrée
      }
    }

    // Ajoute les écouteurs d'événements pour le clic et l'appui sur une touche
    closeButton.addEventListener("click", closeLightBoxEvent);
    closeButton.addEventListener("keydown", closeLightBoxEvent);



    export function getNavChevrons() {
      const navChevronLeft = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-left");
      const navChevronRight = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-right");

      // Ajoute un attribut tabindex à l'élément closeButton pour qu'il puisse être ciblé avec la touche Tab
      navChevronLeft.setAttribute("tabindex", "0");
      navChevronRight.setAttribute("tabindex", "0");

      return { navChevronLeft, navChevronRight };
    }

    export function createVideoContainer() {
      const videoContainers = document.querySelectorAll('.show-lightbox__nav-image video');
      videoContainers.forEach(container => container.remove());

      const videoContainer = document.createElement('video');
      videoContainer.controls = true;
      videoContainer.style.display = 'none';
      document.querySelector('.show-lightbox__nav-image').appendChild(videoContainer);
      return videoContainer;
    }

    export function setMediaAttributes(mediaItem, mediaCard, container) {
      if (mediaItem.image) {
        const img = mediaCard.querySelector('img');
        img.classList.remove('showLightBox');
        img.classList.add('lightbox-media');
        container.setAttribute('src', img.getAttribute('src'));
      } else if (mediaItem.video) {
        const video = mediaCard.querySelector('video');
        video.classList.remove('showLightBox');
        video.classList.add('lightbox-media');
        container.setAttribute('src', video.getAttribute('src'));
      }
    }

     export async function displayPhotographerMedias(clickedImageId) {
      const media = await getPhotographerMedias();
      const imagesContainer = document.querySelector('.show-lightbox__nav-image img');
      const videoContainer = createVideoContainer();

      let initialImageIndex = 0;
      media.forEach((mediaItem, index) => {
        if (mediaItem.id === parseInt(clickedImageId)) {
          initialImageIndex = index;
        }
      });


      let currentIndex = initialImageIndex;

      media.forEach((mediaItem) => {
        const { getMediCardDOM } = mediaFactory(mediaItem);
        const mediaCard = getMediCardDOM();
        setMediaAttributes(mediaItem, mediaCard, mediaItem.image ? imagesContainer : videoContainer);
      });

      const updateLightboxMedia = (currentIndex) => {
        const mediaItem = media[currentIndex];
        const { getMediCardDOM } = mediaFactory(mediaItem);
        const mediaCard = getMediCardDOM();
        setMediaAttributes(mediaItem, mediaCard, mediaItem.image ? imagesContainer : videoContainer);

        if (mediaItem.image) {
          videoContainer.style.display = 'none';
          imagesContainer.style.display = 'block';
        } else if (mediaItem.video) {
          imagesContainer.style.display = 'none';
          videoContainer.style.display = 'block';
        }
      };


      function handleNavChevron(event) {
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

      const { navChevronLeft, navChevronRight } = getNavChevrons();

      navChevronRight.addEventListener('click', handleNavChevron);
      navChevronLeft.addEventListener('click', handleNavChevron);
      navChevronLeft.addEventListener('keydown', handleNavChevron);
      navChevronRight.addEventListener('keydown', handleNavChevron);


      updateLightboxMedia(currentIndex);
    }
