    import { getPhotographers } from '../utils/photographerAPI.js';
    import { photographerMedias, displayMediaElements } from '../utils/photographerMedias.js';
    import { mediaFactory } from '../factories/mediaFactory.js';
    import { displayModal, closeModal } from "../utils/contactForm.js";
    import { openLightbox} from "../utils/lightBoxModal.js";
    import {createDropdownMenu} from "../utils/dropdown-sort.js";
    import {validateForm} from "../utils/form-validation.js";
    import { sortAndDisplay } from "../utils/sortData.js";
    import { updateUI } from "../utils/sortData.js";
    import { createElementWithClass, createRateAndLikesElement, calculateTotalLikes } from '../utils/likeAndRate.js';
    import { displayPhotographerMedias } from "../utils/lightBoxModal.js";
    import { manageHomeLink } from "../utils/homeLink.js";
    import { displayPhotographerInfo } from "../utils/photographerInfos.js";

    // Récupération des paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Récupération du paramètre "id" depuis l'URL
    const photographerId = urlParams.get("id");


    /***************************************************
                  Display Photographer Info
     ***************************************************/
    /**
     * Recherche un photographe par son ID.
     *
     * @async
     * @function
     * @returns {Promise<Object>} - Une promesse résolue avec un objet représentant le photographe trouvé.
     * @throws {Error} - Si aucun photographe n'a été trouvé avec l'ID spécifié.
     */

    export async function fetchData() {
      const dataFrom = await getPhotographers();

      // Trouve le photographe avec l'ID spécifié
      return dataFrom.photographers.find(photographer => photographer.id === parseInt(photographerId));
    }
    /**
     * Affiche les informations du photographe sélectionné
     * @async
     * @function displaySelectedPhotographer
     */
    async function displaySelectedPhotographer() {
      try {
        // Récupère les données du photographe
        const selectedPhotographer = await fetchData();

        if (selectedPhotographer) {
          console.log("Photographe sélectionné :", selectedPhotographer);

          // Affiche les informations du photographe
          displayPhotographerInfo(selectedPhotographer);

          // Gère l'affichage de la modale Contact
          manageContactModal();

          // Gère le lien vers la page d'accueil
          manageHomeLink();

        } else {
          console.error("Aucun photographe ne correspond à l'ID :", photographerId);
        }

      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    }

    // Utilisation de la fonction displaySelectedPhotographer avec une promesse
    displaySelectedPhotographer().then(() => {
      console.log("L'affichage du photographe sélectionné a été effectué avec succès.");
    }).catch((error) => {
      console.error("Une erreur s'est produite lors de l'affichage du photographe sélectionné :", error);
    });


    /***************************************************
                    Display Contact Modal
     ***************************************************/

    /**
     * Gère l'affichage de la modale de contact du photographe sélectionné.
     * Ajoute du texte et des événements aux boutons du modal.
     */
    function manageContactModal() {
      // Récupération du bouton de contact
      const contactButton = document.getElementById('contactButton');

      // Ajout du texte dans le bouton
      contactButton.innerHTML = 'Contactez-moi';

      // Ajout de l'événement clic pour lancer displayModal
      contactButton.addEventListener("click", () => {
        displayModal("contact_modal");
      });

      // Récupération du bouton de fermeture du modal
      const closeModalButton = document.getElementById("closeModalButton");

      // Ajout de l'événement clic pour fermer le modal
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          closeModal();
        }
      });

      closeModalButton.addEventListener("click", () => {
        closeModal();
      });

    }

    /***************************************************
                  Validation du Formulaire
     ***************************************************/

    /**
     * Cette fonction ajoute un écouteur d'événements à un formulaire pour valider les données soumises.
     *
     * @listens form:submit - L'événement qui déclenche l'exécution de la fonction 'validateForm'.
     */
    function submitForm() {
      const form = document.querySelector('form');

      form.addEventListener('submit', validateForm);
      form.reset();
    }

    submitForm();
    console.log("Le formulaire a été soumis !");


    /***************************************************
                  Display Photographe Medias
     ***************************************************/

    /**
     * Affiche les médias du photographe.
     *
     * @async
     * @function
     * @returns {Promise<void>} - Une promesse qui est résolue lorsque les médias sont affichés avec succès.
     * @throws {Error} - Si une erreur se produit lors de l'affichage des médias.
     */
    async function displayPhotographerMedia() {
      const photographerMediaList = await photographerMedias();

      try {
        await displayMediaElements(Object.values(photographerMediaList));
        showLightBox();
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'affichage des médias :", error);
      }
    }

    displayPhotographerMedia().then(() => {
      console.log("Affichage des Médias avec succès !");
    }).catch(error => {
      console.error("Une erreur s'est produite lors de l'affichage des Médias :", error);
    });


    /***************************************************
                  Display Rate And Likes
     ***************************************************/

    /**
     * Crée et affiche le tarif journalier et le nombre total de likes du photographe sélectionné.
     *
     * @param {Object} selectedPhotographer - L'objet du photographe sélectionné.
     * @param {Object} photographerMediaItems - Une liste d'objets représentant les médias du photographe.
     */

    function displayRateAndLikes(selectedPhotographer, photographerMediaItems) {
      const asideElement = createElementWithClass("aside", "");
      asideElement.setAttribute("aria-label", "Informations sur le nombre de likes et le tarif journalier");

      const rateElement = createRateAndLikesElement("div", "rate", `${selectedPhotographer.price}€ / jour`);
      const likeElement = createRateAndLikesElement("div", "likes", `<em class="fa fa-heart"></em> `);
      const totalLikesElement = createRateAndLikesElement("p", "total-likes", `${calculateTotalLikes(photographerMediaItems)}`);

      asideElement.append(rateElement, likeElement, totalLikesElement);
      document.querySelector("main").append(asideElement);
    }


    /**
     * Initialise l'application en récupérant les données des médias du photographe et du photographe sélectionné,
     * puis affiche le tarif et le nombre de likes du photographe sélectionné.
     * En cas d'erreur lors de la récupération des données, l'erreur est enregistrée dans la console.
     *
     * @async
     * @function
     * @throws Crée une erreur s'il y a un problème lors de la récupération des données.
     */
    async function init() {
      try {
        const photographerMediaData = await photographerMedias();
        const selectedPhotographer = await fetchData();

        displayRateAndLikes(selectedPhotographer, photographerMediaData);
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'affichage de l'encart qui représente les likes d'un photographe", error);
      }
    }

    init().then(() => {
      console.log("L'initialisation de  l'encart qui représente les likes d'un photographe a été terminée avec succès.");
    });


    /***************************************************
                          Sorted by
     ***************************************************/

    /**
     * On recherche l'élément 'select' qu'on stocke dans la constante 'selectElement'.
     * Ensuite, on appelle la fonction 'createDropdownMenu' en lui passant 'selectElement' en argument.
     *
     * @type {HTMLSelectElement} selectElement - L'élément 'select' dans le DOM.
     */
    const selectElement = document.querySelector('select');
    createDropdownMenu(selectElement);


    /**
     * Cette fonction est un écouteur d'événement pour un menu déroulant.
     * Lorsque la valeur sélectionnée dans le menu change,la fonction sortAndDisplay est appelée
     * La fonction updateUI est appelée pour mettre à jour l'interface utilisateur.
     * La fonction showLightBox est appelée pour afficher la lightbox.
     *
     * @listens #dropdownMenu:change - L'événement qui déclenche l'exécution de cette fonction.
     * @param {Event} event - L'objet Event qui représente l'événement qui a déclenché l'écouteur.
     */
    document.querySelector("#dropdownMenu").addEventListener("change", async (event) => {
      try {
        const mediaList = await photographerMedias();
        const sortedData = sortAndDisplay(event, mediaList);
        updateUI(sortedData, mediaFactory, showLightBox);
      } catch (error) {
        console.error("Une erreur s'est produite lors du chargement des données :", error);
      }
    });


    /***************************************************
                        Display Lightbox
     ***************************************************/

    /**
     * La fonction affiche une lightbox lorsque l'utilisateur clique
     * sur l'élément avec la classe CSS "showLightBox".
     * @function
     * @returns {void}
     */

    function showLightBox() {
      const cardImgElements = document.querySelectorAll(".showLightBox");

      cardImgElements.forEach((card) => {
        // Gestionnaire d'événements pour le clic
        card.addEventListener("click", () => {
          const imageId = card.getAttribute('data-id');
          displayPhotographerMedias(imageId)
            .then(() => {
              openLightbox("showLightBox");
            });
        });

        // Gestionnaire d'événements pour la touche "Enter"
        card.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            const imageId = card.getAttribute('data-id');
            displayPhotographerMedias(imageId)
              .then(() => {
                openLightbox("showLightBox");
              });
          }
        });
      });
    }

