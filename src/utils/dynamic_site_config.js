/**
 * Utility functions to dynamically update site configuration elements like title and favicon
 */

/**
 * Updates the document title based on clinic name from settings
 * @param {string} clinicName - The name of the clinic from settings
 */
export const updateDocumentTitle = (clinicName) => {
  if (clinicName) {
    document.title = `${clinicName} - Appointment System`;
  } else {
    document.title = "BABAR APPOINTMENT SYSTEM";
  }
};

/**
 * Updates the favicon based on the settings
 * @param {string} faviconUrl - The URL of the favicon from settings
 */
export const updateFavicon = (faviconUrl) => {
  const linkElement = document.querySelector('link[rel="icon"]');
  
  if (linkElement && faviconUrl) {
    linkElement.href = faviconUrl;
  } else if (linkElement) {
    // Fallback to default favicon
    linkElement.href = "/logo-1.png";
  }
};

/**
 * Updates both document title and favicon based on settings
 * @param {Object} settings - The settings object with name and favicon
 */
export const updateSiteConfiguration = (settings) => {
  if (settings) {
    updateDocumentTitle(settings.name);
    updateFavicon(settings.favicon);
  }
};
