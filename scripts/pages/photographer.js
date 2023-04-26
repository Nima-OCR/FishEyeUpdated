    import { getPhotographers } from '../utils/photographerAPI.js';
    import { photographerMedias } from '../utils/photographerMedias.js';
    import { mediaFactory } from '../factories/mediaFactory.js';

    // Récupération des paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Récupération du paramètre "id" depuis l'URL
    const photographerId = urlParams.get("id");

    // Affichage des paramètres récupérés dans la console
    console.log("ID du photographe sélectionné :", photographerId);

    //Appel à la fonction photographerMedia() pour récupérer les médias du photographe
    const photographerMediaItems = await photographerMedias();


    // Affiche les données des médias du photographe dans la console
    console.log("Données des médias du photographe :", photographerMediaItems);

    /**
     * Recherche un photographe par son ID.
     *
     * @async
     * @function
     * @param {number} photographerId - L'ID du photographe à rechercher.
     * @returns {Promise<Object>} - Une promesse résolue avec un objet représentant le photographe trouvé.
     * @throws {Error} - Si aucun photographe n'a été trouvé avec l'ID spécifié.
     */
    const dataFrom = await getPhotographers();

    async function fetchData() {

      // Trouver le photographe avec l'ID spécifié et le retourner directement
      return dataFrom.photographers.find(photographer => photographer.id === parseInt(photographerId));
    }

    /**
    * Récupère et affiche les données du photographe sélectionné.
    *
    * @async
    * @function
    * @returns {Promise<void>} - Une promesse qui est résolue lorsque les données sont affichées avec succès.
    * @throws {Error} - Si une erreur se produit lors de la récupération ou de l'affichage des données.
    */
    async function displaySelectedPhotographer() {
      try {
        const selectedPhotographer = await fetchData();

        if (selectedPhotographer) {
          console.log("Photographe sélectionné :", selectedPhotographer);
          console.log("Les données ont été récupérées avec succès.");

          // Affiche le nom du photographe
          const nameElement = document.querySelector('#photographerName');
          nameElement.innerHTML = selectedPhotographer.name;

          // Affiche la localisation du photographe
          const locationElement = document.querySelector('#photographerLocation');
          locationElement.innerHTML = `${selectedPhotographer.city}, ${selectedPhotographer.country}`;

          // Affiche la description du photographe
          const taglineElement = document.querySelector('#photographerTagline');
          taglineElement.innerHTML = selectedPhotographer.tagline;

          // Affiche l'image du photographe
          const imageElement = document.querySelector('#photographerImage');
          imageElement.src = `./assets/photographers/${selectedPhotographer.portrait}`;
          imageElement.alt = selectedPhotographer.name;

          // Récupération du bouton de contact
          const contactButton = document.querySelector('#contactButton');

          // Ajout du texte dans le bouton
          contactButton.innerHTML = 'Contactez-moi';

          // lien vers Accueil
          const logo = document.querySelector('.logo');

          const redirectToHome = () => {
            window.location.href = 'index.html';
          };

          logo.addEventListener('click', redirectToHome);

          logo.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              redirectToHome();
            }
          });

          logo.setAttribute('aria-label', 'Lien vers la page d\'accueil');

          logo.setAttribute('tabindex', '0');


        } else {
          console.error("Aucun photographe ne correspond à l'ID :", photographerId);
        }

      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    }

    // Utilisation de la fonction displaySelectedPhotographer avec une promesse
    displaySelectedPhotographer()
      .then(selectedPhotographer => {
        console.log("La promesse a été résolue avec succès ! La valeur de résolution est :", selectedPhotographer);
    }).catch(error => {
        console.error("Une erreur s'est produite :", error);
    });


    /**

     Affiche les éléments multimédias dans la page à partir d'une liste d'objet de photographies.
     @function
     @param {Array} photographies - La liste d'objet des photographies à afficher.
     @throws {Error} - Si la liste d'objet de photographies est vide.
     */
    // affiche les médias à partir d'une liste d'objets
    function displayMediaElements(photographies) {
      console.log('Éléments à afficher :', photographies);

      const section = document.createElement("div");
      section.className = "media-section";

      const mainElement = document.querySelector("main");
      mainElement.append(section);

      photographies.forEach((photographie, index) => {
        console.log(`Affichage de la photographie ${index + 1} :`, photographie);

        const cardModel = mediaFactory(photographie);
        const cardElement = cardModel.getMediCardDOM();
        section.append(cardElement);
      });

      console.log('Éléments multimédias affichés avec succès.');
    }

    /**
     * Affiche les médias du photographe.
     *
     * @async
     * @function
     * @returns {Promise<void>} - Une promesse qui est résolue lorsque les médias sont affichés avec succès.
     * @throws {Error} - Si une erreur se produit lors de l'affichage des médias.
     */
    async function displayPhotographerMedia() {
      try {
        await displayMediaElements(photographerMediaItems);
        console.log('Les médias du photographe ont été affichés avec succès.');
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'affichage des médias :", error);
      }
    }

    displayPhotographerMedia().then(() => {
      console.log("La promesse a été résolue avec succès !");
    }).catch(error => {
      console.error("Une erreur s'est produite :", error);
    });
