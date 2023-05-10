

     function createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }

    export function createRateElement(selectedPhotographer) {
      const rateElement = createElementWithClass("div", "rate");
      rateElement.innerHTML = `${selectedPhotographer.price}€ / jour`;
      console.log(`Tarif journalier : ${selectedPhotographer.price}€`);
      return rateElement;
    }

    export function createLikeElement() {
      const likeElement = createElementWithClass("div", "likes");
      likeElement.innerHTML = `<i class="fa fa-heart"></i> `;
      return likeElement;
    }

    function calculateTotalLikes(photographerMediaItems) {
      return photographerMediaItems.reduce((sum, item) => sum + item.likes, 0);
    }

    export function createTotalLikesElement(photographerMediaItems) {
      const totalLikes = createElementWithClass("p", "total-likes");
      const totalOfLikes = calculateTotalLikes(photographerMediaItems);
      console.log(`Total likes : ${totalOfLikes}`);
      totalLikes.textContent = `${totalOfLikes}`;
      return totalLikes;
    }
