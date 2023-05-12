  /**
   * Crée l'élément HTML avec la classe et le contenu HTML
   *
   * @param {string} tag - Le nom de l'élément HTML à créer comme ('div', 'span', 'a', etc.).
   * @param {string} className - Le nom de la classe de l'élément.
   * @param {string} [innerHTML=''] - Le contenu HTML de l'élément. Par défaut, c'est une chaîne vide.
   *
   * @returns {HTMLElement} - L'élément HTML créé avec la classe et le contenu HTML.
   *
   */

  export function createElementWithClass(tag, className, innerHTML = '') {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = innerHTML;
    return element;
  }

  /**
   * Crée l'élément HTML avec la classe et le contenu pour afficher le tarif et les "likes".
   *
   * @param {string} tag - Le nom de l'élément HTML à créer comme ('div', 'span', 'a', etc.).
   * @param {string} className - Le nom de la classe de l'élément.
   * @param {string} content - Le contenu à définir pour l'élément.
   *
   * @returns {HTMLElement} - L'élément HTML créé avec la classe et son contenu, pour afficher le tarif et les "likes".
   *
   */
  export function createRateAndLikesElement(tag, className, content) {
    return createElementWithClass(tag, className, content);
  }



  /**
   * Calcule le total des "likes"
   *
   * @param {Object} photographerMediaItems - Un tableau d'objets représentant les médias du photographe.
   * Chaque objet contient une propriété "likes" qui indique le nombre de "likes" de l'élément média.
   *
   * @returns  - Le total des "likes" de tous les éléments média du photographe.
   */
  export function calculateTotalLikes(photographerMediaItems) {
    return photographerMediaItems.reduce((sum, item) => sum + item.likes, 0);
  }
