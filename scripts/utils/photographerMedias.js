    import { getPhotographers } from './photographerAPI.js';
    import { mediaFactory } from "../factories/mediaFactory.js";

    /**

     Récupère les médias d'un photographe en utilisant son ID.
     @function
     @async
     @throws {Error} Si le photographe avec l'ID est introuvable.
     @returns {Promise<Object>} Un objet contenant une liste d'objet appartenant au photographe.
     */
    export async function photographerMedias() {
      const { media, photographers } = await getPhotographers();
      const photographerId = parseInt(new URLSearchParams(window.location.search).get("id"));
      const photographer = photographers.find((photographer) => photographer.id === photographerId);

      if (!photographer) {
        throw new Error("Les médias du photographe avec l'ID spécifié sont introuvables.");
      }

      return media.filter((mediaItem) => mediaItem.photographerId === photographerId);
    }


    /**
     Affiche les éléments médias dans la page.
     @function
     @param {Object} photographies - La liste d'objet des photographies à afficher.
     @throws {Error} - Erreur si la liste d'objet est vide.
     */
    // affiche les médias à partir d'une liste d'objets
    export function displayMediaElements(photographies) {
      console.log('Éléments à afficher :', photographies);

      const section = document.createElement("div");
      section.className = "media-section";
      // section.setAttribute("role", "region");

      const mainElement = document.querySelector("main");
      mainElement.append(section);

      photographies.forEach((photographie) => {
        const cardModel = mediaFactory(photographie);
        const cardElement = cardModel.getMediCardDOM();
        // cardElement.setAttribute("tabindex", "0");
        section.append(cardElement);
      });
    }
