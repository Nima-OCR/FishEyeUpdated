
let lastActiveElement;

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
        // displayMedias();

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
