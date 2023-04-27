import { getPhotographers } from './photographerAPI.js';


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
