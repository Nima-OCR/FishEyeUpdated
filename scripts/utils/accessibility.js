

    export function updateElementAttributes(element, display, ariaHidden, tabIndex, ariaModal, role, ariaLabel, altText) {
      element.style.display = display;
      element.setAttribute("aria-hidden", ariaHidden);
      element.setAttribute("tabindex", tabIndex);

      if (altText) {
        element.setAttribute("alt", altText);
      } else {
        element.removeAttribute("alt");
      }

      if (ariaLabel) {
        element.setAttribute("aria-label", ariaLabel);
      } else {
        element.removeAttribute("aria-label");
      }

      if (ariaModal) {
        element.setAttribute("aria-modal", ariaModal);
      } else {
        element.removeAttribute("aria-modal");
      }

      if (role) {
        element.setAttribute("role", role);
      } else {
        element.removeAttribute("role");
      }
    }
