
  /**
   * Cette fonction crée un menu déroulant pour trier les données.
   * Elle ajoute également une étiquette de texte et des options au menu déroulant.
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
      // Créer un élément <option>
      const option = document.createElement('option');

      // Définir la classe de l'option
      option.setAttribute('class', 'dropdown__options');

      // Définir la valeur de l'option
      option.setAttribute('value', optionData.value);

      // Définir le texte de l'option
      option.textContent = optionData.text;

      // Ajouter l'option à l'élément select
      selectElement.appendChild(option);
    });


    // Ajouter des écouteurs d'événements pour la gestion du clic et de la touche Entrée
    selectElement.addEventListener('click', function() {
      toggleArrowRotation();
    });

    selectElement.addEventListener('keydown', function(event) {
      if (event.key === "Enter") {
        toggleArrowRotation();
      }
    });

    // Fonction interne pour basculer la rotation de la flèche
    function toggleArrowRotation() {
      const arrow = selectElement.parentNode.querySelector('.dropdown');
      if (arrow) {
        arrow.classList.toggle('rotate');
      }
    }
  }
