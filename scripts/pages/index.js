    async function getPhotographers() {
      //  En utilisant l'option await, la fonction fetch() retourne une promesse qui est résolue avec l'objet Response représentant la réponse HTTP.
      const response = await fetch('data/photographers.json'); // Utilise l'API fetch pour récupérer le fichier JSON

      console.log('Données récupérées depuis le fichier JSON :', response);

      const photographers = await response.json(); // Transforme la réponse en objet JavaScript

      console.log('Données des photographes récupérées :', photographers);

      return photographers; // Retourne les données encapsulées dans un objet avec une propriété `photographers`
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");// L'élément HTML qui va contenir les photographes

      console.log('Section pour les photographes récupérée :', photographersSection);

        photographers.forEach((photographer) => {// Pour chaque photographe dans le tableau
            const photographerModel = photographerFactory(photographer);// Utiliser la fonction photographerFactory pour générer les éléments HTML
            const userCardDOM = photographerModel.getUserCardDOM();// Récupérer les éléments HTML générés pour le photographe
            photographersSection.appendChild(userCardDOM);// Ajouter les éléments HTML au conteneur pour les photographes dans la page
        });

      console.log('Affichage des photographes terminé');
    }


    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();

      console.log('Initialisation terminée : récupération des photographes terminée');

      // Affiche les données des photographes, prend en entrée le tableau de photographes récupérés
        displayData(photographers);
    }

    // Appelle la fonction `init` au chargement de la page pour récupérer et afficher les données des photographes
    init();
