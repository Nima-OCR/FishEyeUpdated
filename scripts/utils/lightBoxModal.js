import {mediaFactory} from "../factories/mediaFactory.js";
import {photographerMedias} from "./photographerMedias.js";

let lastActiveElement;
const modal = document.getElementById("showLightBox");
const closeButton = document.querySelector(".show-lightbox__close-btn");

async function getPhotographerMedias() {
  return await photographerMedias();
}

function toggleModal(display, ariaHidden, tabIndex, ariaModal, role) {
  modal.style.display = display;
  modal.setAttribute("aria-hidden", ariaHidden);
  modal.setAttribute("tabindex", tabIndex);
  if (ariaModal) {
    modal.setAttribute("aria-modal", ariaModal);
  } else {
    modal.removeAttribute("aria-modal");
  }
  if (role) {
    modal.setAttribute("role", role);
  } else {
    modal.removeAttribute("role");
  }
}

export function openLightbox() {
  console.log('Ouverture de la lightbox');
  lastActiveElement = document.activeElement;
  toggleModal("block", "false", "-1", "true", "dialog");
  modal.focus();
}

export function closeLightbox() {
  console.log('Fermeture de la lightbox');
  toggleModal("none", "true", null, null, null);
  if (lastActiveElement) {
    lastActiveElement.focus();
  }
}

function closeLightBoxEvent(event) {
  if (event.type === "click" || (event.type === "keydown" && event.key === "Enter" && document.activeElement === closeButton)) {
    closeLightbox();
    event.preventDefault();
  }
}

function addEventListeners(element, handler) {
  element.addEventListener("click", handler);
  element.addEventListener("keydown", handler);
}

addEventListeners(closeButton, closeLightBoxEvent);

export function getNavChevrons() {
  const navChevronLeft = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-left");
  const navChevronRight = document.querySelector(".show-lightbox__nav-chevron.fa-solid.fa-chevron-right");

  navChevronLeft.setAttribute("tabindex", "0");
  navChevronRight.setAttribute("tabindex", "0");

  return { navChevronLeft, navChevronRight };
}

export function createVideoContainer() {
  const videoContainers = document.querySelectorAll('.show-lightbox__nav-image video');
  videoContainers.forEach(container => container.remove());

  const videoContainer = document.createElement('video');
  videoContainer.controls = true;
  videoContainer.style.display = 'none';
  document.querySelector('.show-lightbox__nav-image').appendChild(videoContainer);

  return videoContainer;
}

function manageMediaAttributes(mediaElement, removeClass, addClass, container) {
  mediaElement.classList.remove(removeClass);
  mediaElement.classList.add(addClass);
  container.setAttribute('src', mediaElement.getAttribute('src'));
}

export function setMediaAttributes(mediaItem, mediaCard, container) {
  if (mediaItem.image) {
    const img = mediaCard.querySelector('img');
    manageMediaAttributes(img, 'showLightBox', 'lightbox-media', container);
  } else if (mediaItem.video) {
    const video = mediaCard.querySelector('video');
    manageMediaAttributes(video, 'showLightBox', 'lightbox-media', container);
  }
}

export async function displayPhotographerMedias(clickedImageId) {
  const media = await getPhotographerMedias();
  const imagesContainer = document.querySelector('.show-lightbox__nav-image img');
  const videoContainer = createVideoContainer();

  let currentIndex = media.findIndex(mediaItem => mediaItem.id === parseInt(clickedImageId));

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
    const { navChevronLeft, navChevronRight } = getNavChevrons();

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

  [navChevronLeft, navChevronRight].forEach(navChevron => addEventListeners(navChevron, handleNavChevron));

  updateLightboxMedia(currentIndex);
}
