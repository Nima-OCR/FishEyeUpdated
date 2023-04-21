import { getPhotographers } from './photographerAPI.js';

/**
 * Récupère les données d'un photographe à partir de son ID.
 * @async
 * @function
 * @returns {Promise<Object>} L'objet photographe correspondant à l'ID spécifié.
 * @throws {Error} Lance une erreur si la requête échoue ou si l'ID du photographe est introuvable.
 */
export async function getPhotographerData() {
  const { photographers } = await getPhotographers();
  const photographerId = new URLSearchParams(window.location.search).get("id");
  const photographer = photographers.find((photographer) => photographer.id === photographerId);

  if (!photographer) {
    throw new Error("Le photographe avec l'ID spécifié est introuvable.");
  }

  return photographer;
}
