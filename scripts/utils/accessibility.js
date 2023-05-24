
  /**
   * Met à jour les attributs.
   * @param {HTMLElement} element - L'élément à mettre à jour.
   * @param {string} display - La valeur de l'attribut "display".
   * @param {boolean} ariaHidden - La valeur de l'attribut "aria-hidden".
   * @param {number} tabIndex - La valeur de l'attribut "tabindex".
   * @param {boolean} ariaModal - La valeur de l'attribut "aria-modal".
   * @param {string} role - La valeur de l'attribut "role".
   * @param {string} ariaLabel - La valeur de l'attribut "aria-label".
   * @param {string} altText - Le texte alternatif pour l'élément.
   */
  export function updateElementAttributes(element, display, ariaHidden, tabIndex, ariaModal, role, ariaLabel, altText) {
    element.style.display = display;
    element.setAttribute("aria-hidden", ariaHidden);
    element.setAttribute("tabindex", tabIndex);

    if (altText) {
      element.setAttribute("alt", altText);
    } else {
      element.removeAttribute("alt");
    }

    if (ariaLabel) {
      element.setAttribute("aria-label", ariaLabel);
    } else {
      element.removeAttribute("aria-label");
    }

    if (ariaModal) {
      element.setAttribute("aria-modal", ariaModal);
    } else {
      element.removeAttribute("aria-modal");
    }

    if (role) {
      element.setAttribute("role", role);
    } else {
      element.removeAttribute("role");
    }
  }

  /**
   * Définit la valeur de l'attribut "tabindex" pour une liste d'éléments.
   * @param {HTMLElement[]} elements - La liste des éléments à mettre à jour.
   * @param {number} tabIndex - La valeur de l'attribut "tabindex" à définir.
   */
  export function setTabIndexForElements(elements, tabIndex) {
    elements.forEach(element => element.setAttribute('tabindex', tabIndex));
  }
