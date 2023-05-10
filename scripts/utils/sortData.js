

    /**
     * Trie les données des médias en fonction du critère de tri sélectionné.
     *
     * @param {Object[]} data - Liste d'objets médias à trier.
     * @param {string} sortBy - Critère de tri par "Popularité", "Date" ou "Titre"
     * @returns {Object[]} Liste d'objets médias triée en fonction du critère sélectionné.
     */
    function sortData(data, sortBy) {
      return data.sort((mediaA, mediaB) => {
        switch (sortBy) {
          case "Popularité":
            // Trie par popularité "likes"
            return mediaB.likes - mediaA.likes;
          case "Date":
            // Trie par date "date"
            return new Date(mediaB.date) - new Date(mediaA.date);
          case "Titre":
            // Trie par titre "title"
            return mediaA.title.localeCompare(mediaB.title);
          default:
            // Ne pas trier si le critère de tri n'est pas valide
            return 0;
        }
      });
    }

    //met à jour l'interface utilisateur avec les données triées.
    export function updateUI(sortedData, mediaFactory, showLightBox) {
      // Supprime les éléments médias existants du conteneur
      const mediaContainer = document.querySelector(".media-section");
      while (mediaContainer.firstChild) {
        mediaContainer.removeChild(mediaContainer.firstChild);
      }

      // Recrée et ajoute les éléments médias à partir des données triées
      sortedData.forEach(mediaData => {
        const mediaItem = mediaFactory(mediaData);
        mediaContainer.appendChild(mediaItem.getMediCardDOM());
      });

      showLightBox();
    }

    //traite l'événement de changement, trie les données et affiche les données triées.
    export function handleSortAndDisplay(event, photographerMediaItems) {
      // Récupère la valeur sélectionnée dans le menu déroulant
      const sortBy = event.target.value;

      // Trie les données en fonction de la valeur sélectionnée
      const sortedData = sortData(photographerMediaItems, sortBy);

      // Affiche les données triées dans la console en fonction de la valeur sélectionnée
      if (sortBy === "Date") {
        console.log("Dates triées:", sortedData.map(item => item.date));
      } else if (sortBy === "Titre") {
        console.log("Titres triés:", sortedData.map(item => item.title));
      } else if (sortBy === "Popularité") {
        console.log("Popularités triées:", sortedData.map(item => item.likes));
      }

      return sortedData;
    }
