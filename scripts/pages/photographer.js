    import { getPhotographers } from '../utils/photographerAPI.js';
    import { photographerMedias } from '../utils/photographerMedias.js';
    import { mediaFactory } from '../factories/mediaFactory.js';
    import { displayModal, closeModal } from "../utils/contactForm.js";
    import { getNavChevrons} from "../utils/lightBoxModal.js";
    import { openLightbox} from "../utils/lightBoxModal.js";


    // Récupération des paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);

    // Récupération du paramètre "id" depuis l'URL
    const photographerId = urlParams.get("id");

    // Affichage des paramètres récupérés dans la console
    console.log("ID du photographe sélectionné :", photographerId);

    //Appel à la fonction photographerMedia() pour récupérer les médias du photographe
    const photographerMediaItems = await photographerMedias();


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


          /*****************************************************
           * Cette partie du code gère l'affichage de la modale
           ****************************************************/

            // Récupération du bouton de contact
          const contactButton = document.getElementById('contactButton');

          // Ajout du texte dans le bouton
          contactButton.innerHTML = 'Contactez-moi';

          // Ajout de l'événement clic pour lancer displayModal
          contactButton.addEventListener("click", () => {
            displayModal("contact_modal");
          });

          const closeModalButton = document.getElementById("closeModalButton");

          closeModalButton.addEventListener("click", () => {
            closeModal();
          });


          /****************************************************************
           Cette partie du code gère la validation du formulaire.
           Le formulaire doit être rempli correctement avant d'être soumis
           ****************************************************************/
          const form = document.querySelector('form');

          form.addEventListener('submit', (event) => {
            event.preventDefault();

            const firstNameInput = document.querySelector('#first-name');
            const lastNameInput = document.querySelector('#last-name');
            const emailInput = document.querySelector('#email');
            const messageInput = document.querySelector('#message');

            // Regex pour valider le prénom et le nom
            const regexName = /^[a-zA-Zéèêëîïôöûüçàáâäåæìíîïðñòóôõöøùúûüýÿ\-']+$/;

            // Regex pour valider l'email
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            let isFormValid = true;

            if (!regexName.test(firstNameInput.value)) {
              console.log('Le prénom n\'est pas valide');
              isFormValid = false;
            }
            if (!regexName.test(lastNameInput.value)) {
              console.log('Le nom n\'est pas valide');
              isFormValid = false;
            }
            if (!regexEmail.test(emailInput.value)) {
              console.log('L\'email n\'est pas valide');
              isFormValid = false;
            }
            if (messageInput.value.trim() === '') {
              console.log('Le message ne peut pas être vide');
              isFormValid = false;
            }

            if (isFormValid) {
              // Soumettre le formulaire si tous les champs sont remplis correctement
              console.log('Le formulaire a bien été soumis');
              form.submit();

              // Fermer la modale après la soumission du formulaire
              closeModal();
            } else {
              // Afficher un message d'erreur dans la console si le formulaire est invalide
              console.log('Le formulaire est invalide');
            }
          });


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
        console.log("La promesse a été résolue avec succès !");
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
        showLightBox();
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'affichage des médias :", error);
      }
    }

    displayPhotographerMedia().then(() => {
      console.log("La promesse a été résolue avec succès !");
    }).catch(error => {
      console.error("Une erreur s'est produite :", error);
    });


    /**
     * Encart qui affiche le tarif journalier et le nombre de likes du photographe sélectionné.
     *
     * @param {Object} selectedPhotographer - L'objet représentant le photographe sélectionné.
     */
    function displayRateAndLikes(selectedPhotographer) {
      // Création de l'élément aside
      const asideElement = document.createElement("aside");

      // Création de l'élément pour afficher le tarif journalier
      const rateElement = document.createElement("div");
      rateElement.className = "rate";
      rateElement.innerHTML = `${selectedPhotographer.price}€ / jour`;

      // Création de l'élément pour afficher le nombre de likes
      const likeElement = document.createElement("div");
      likeElement.className = "likes";
      likeElement.innerHTML = `<i class="fa fa-heart"></i> ${selectedPhotographer.likes}`;

      // Ajout des éléments tarif et likes à l'aside
      asideElement.append(rateElement);
      asideElement.append(likeElement);

      // Ajout de l'aside à la page
      document.querySelector("main").append(asideElement);
    }
    let selectedPhotographer = null;

    async function fetchSelectedPhotographerData() {
      try {
        selectedPhotographer = await fetchData();

        // ...
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
      }
    }

    fetchSelectedPhotographerData().then(() => {
      console.log("La promesse a été résolue avec succès !");
      displayRateAndLikes(selectedPhotographer);
    });


    /***************************************************
     Lightbox
     ***************************************************/

    const imageElement = document.querySelector('.showLightBox');
    const imageId = imageElement.getAttribute('data-id');
    console.log('ID de l\'image:', imageId);


    /**
     * La fonction affiche une lightbox lorsque l'utilisateur clique
     * sur l'élément avec la classe CSS "showLightBox".
     * @function
     * @returns {void}
     */

    function showLightBox() {

      const cardImgElements = document.querySelectorAll(".showLightBox");

      cardImgElements.forEach((card) => {
        card.addEventListener("click", () => {
          const imageId = card.getAttribute('data-id');
          displayPhotographerMedias(imageId);

          openLightbox("showLightBox");
        });
      });
    }


    /**
     * Affiche les médias (images et vidéos) du photographe dans une lightbox.
     * @async
     */
    async function getPhotographerMedias() {
      return await photographerMedias();
    }


    function createVideoContainer() {
      const videoContainers = document.querySelectorAll('.show-lightbox__nav-image video');
      videoContainers.forEach(container => container.remove());

      const videoContainer = document.createElement('video');
      videoContainer.controls = true;
      videoContainer.style.display = 'none';
      document.querySelector('.show-lightbox__nav-image').appendChild(videoContainer);
      return videoContainer;
    }


    function setMediaAttributes(mediaItem, mediaCard, container) {
      if (mediaItem.image) {
        const img = mediaCard.querySelector('img');
        img.classList.remove('showLightBox');
        img.classList.add('lightbox-media');
        container.setAttribute('src', img.getAttribute('src'));
      } else if (mediaItem.video) {
        const video = mediaCard.querySelector('video');
        video.classList.remove('showLightBox');
        video.classList.add('lightbox-media');
        container.setAttribute('src', video.getAttribute('src'));
      }
    }

    async function displayPhotographerMedias(clickedImageId) {
      const media = await getPhotographerMedias();
      const imagesContainer = document.querySelector('.show-lightbox__nav-image img');
      const videoContainer = createVideoContainer();

      let initialImageIndex = 0;
      media.forEach((mediaItem, index) => {
        if (mediaItem.id === parseInt(clickedImageId)) {
          initialImageIndex = index;
        }
      });


      let currentIndex = initialImageIndex;

      media.forEach((mediaItem) => {
        const { getMediCardDOM } = mediaFactory(mediaItem);
        const mediaCard = getMediCardDOM();
        setMediaAttributes(mediaItem, mediaCard, mediaItem.image ? imagesContainer : videoContainer);
      });

      const updateLightboxMedia = (currentIndex) => {
        const mediaItem = media[currentIndex];
        const { getMediCardDOM } = mediaFactory(mediaItem);
        const mediaCard = getMediCardDOM();
        setMediaAttributes(mediaItem, mediaCard, mediaItem.image ? imagesContainer : videoContainer);

        if (mediaItem.image) {
          videoContainer.style.display = 'none';
          imagesContainer.style.display = 'block';
        } else if (mediaItem.video) {
          imagesContainer.style.display = 'none';
          videoContainer.style.display = 'block';
        }
      };


      function handleNavChevron(event) {
        if (event.type === "click" || (event.key === "Enter" && (document.activeElement === navChevronLeft || document.activeElement === navChevronRight))) {
          if (document.activeElement === navChevronLeft) {
            currentIndex = (currentIndex - 1 + media.length) % media.length;
          } else if (document.activeElement === navChevronRight) {
            currentIndex = (currentIndex + 1) % media.length;
          }
          updateLightboxMedia(currentIndex);

          event.preventDefault();
        }
      }

      const { navChevronLeft, navChevronRight } = getNavChevrons();

      navChevronRight.addEventListener('click', handleNavChevron);
      navChevronLeft.addEventListener('click', handleNavChevron);
      navChevronLeft.addEventListener('keydown', handleNavChevron);
      navChevronRight.addEventListener('keydown', handleNavChevron);


      updateLightboxMedia(currentIndex);
    }
