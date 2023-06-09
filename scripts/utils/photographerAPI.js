/**
 * Récupère les photographes à partir d'un fichier JSON.
 * @async
 * @function
 * @returns {Promise<Object>} Un objet contenant des photographes.
 * @throws {Error} Lance une erreur si la requête échoue.
 */

export async function getPhotographers() {
  try {
    const response = await fetch('data/photographers.json');
    return response.json();
  } catch (error) {
    console.log("Erreur lors de la récupération des photographes : " + error.message);
  }
}
