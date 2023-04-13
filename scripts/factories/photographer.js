//génère les éléments HTML nécessaires pour afficher un photographe
function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait} = data;// Extraire le nom et le chemin d'accès à l'image du photographe depuis l'objet `data`
  const picture = `assets/photographers/${portrait}`;//chemin d'accès à l'image du photographe.

  //La fonction crée un élément article, une image et un titre.
    function getUserCardDOM() {
        const article = document.createElement( 'article' );// Créer un élément HTML "article" pour contenir les éléments du photographe
        const img = document.createElement( 'img' );// Créer un élément HTML "img" pour afficher l'image du photographe
        img.setAttribute("src", picture)// Ajouter l'attribut "src" à l'élément "img" pour afficher l'image
        const h2 = document.createElement( 'h2' );// Créer un élément HTML "h2" pour afficher le nom du photographe

        //Ajoute le nom du photographe dans la balise h2
        h2.textContent = name;

        //Ajoute l'élément img à l'intérieur de l'élément article
        article.appendChild(img);
        //Ajoute l'élément h2 à l'intérieur de l'élément article
        article.appendChild(h2);
        return (article);// Renvoi l'élément article complet
    }

  //   TEST CONSOLE
  // Stocker le nom et le chemin d'accès à l'image dans un objet de test pour l'afficher dans la console
  const userCard = {
      name, picture
    };
  console.log(userCard);

    return { name, id, city, country, tagline, price, portrait, getUserCardDOM }// Renvoi les informations du photographe et la fonction `getUserCardDOM`

}
