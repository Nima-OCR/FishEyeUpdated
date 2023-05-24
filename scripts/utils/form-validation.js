  import {closeModal} from "./contactForm.js";


  // fonction de validation
  export function validateForm(event) {
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
      closeModal();
      // Réinitialiser le formulaire
      event.target.reset();
      // Soumettre le formulaire si tous les champs sont remplis correctement
      console.log('Le formulaire a bien été soumis');
      console.log('Retour à la page du photographe');
    } else {
      // Afficher un message d'erreur dans la console si le formulaire est invalide
      console.log('Le formulaire est invalide');
    }
  }
