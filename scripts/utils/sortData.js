

    /**
     * Trie les données des médias en fonction du critère de tri sélectionné.
     *
     * @param {Object[]} data - Liste d'objets médias à trier.
     * @param {string} sortBy - Critère de tri par "Popularité", "Date" ou "Titre"
     * @returns {Object[]} Liste d'objets médias triée en fonction du critère sélectionné.
     */
    export function sortData(data, sortBy) {
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
