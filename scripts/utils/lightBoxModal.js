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
