

    export function updateElementAttributes(element, display, ariaHidden, tabIndex, ariaModal, role, ariaLabel, altText, labelText) {
      element.style.display = display;
      element.setAttribute("aria-hidden", ariaHidden);
      element.setAttribute("tabindex", tabIndex);

      if (altText) {
        element.setAttribute("alt", altText);
      } else {
        element.removeAttribute("alt");
      }

      if (labelText) {
        element.setAttribute("aria-label", labelText);
        element.setAttribute("label", labelText);
      } else {
        element.removeAttribute("aria-label");
        element.removeAttribute("label");
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
