/**
 * Maps a reactive form object to a payload object, excluding specific keys.
 * @param {Object} form - The reactive form object to be mapped.
 * @param {Array} excludeKeys - Keys to be excluded from the final payload.
 * @returns {Object} The mapped payload with excluded keys.
 */
function mapFormToPayload(form, excludeKeys = []) {
  return Object.entries(form).reduce((acc, [formKey, formValue]) => {
    if (!excludeKeys.includes(formKey)) {
      acc[formKey] = formValue;
    }
    return acc;
  }, {});
}

export { mapFormToPayload };
