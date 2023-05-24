

    /**
     * Gère le lien vers la page d'accueil
     * Ajoute un événement clic au logo pour rediriger vers la page d'accueil
     * @returns {void}
     */
    export function manageHomeLink() {
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
    }
