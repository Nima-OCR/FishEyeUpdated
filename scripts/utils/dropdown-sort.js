

/**
 * Cette fonction crée un menu déroulant pour trier les données. Elle ajoute également une étiquette de texte et des options au menu déroulant.
 *
 * @param {HTMLSelectElement} selectElement - L'élément 'select' dans lequel les options seront ajoutées.
 */
export function createDropdownMenu(selectElement) {
  // Créer le label et l'ajoute au DOM avant la balise select
  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', 'dropdownMenu');
  labelElement.textContent = 'Trier par ';
  selectElement.parentNode.insertBefore(labelElement, selectElement);

  // Définir les attributs de l'élément select
  selectElement.setAttribute('class', 'dropdown');
  selectElement.setAttribute('id', 'dropdownMenu');
  selectElement.setAttribute('aria-label', 'Menu de tri');

  // Créer les options et les ajouter au select
  const options = [
    { text: 'Popularité', value: 'Popularité' },
    { text: 'Date', value: 'Date' },
    { text: 'Titre', value: 'Titre' }
  ];

  options.forEach(optionData => {
    const option = document.createElement('option');
    option.setAttribute('class', 'dropdown__options');
    option.setAttribute('value', optionData.value);
    option.textContent = optionData.text;
    selectElement.appendChild(option);
  });
}

