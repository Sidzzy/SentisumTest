import config from '../src/config';

export const updateLayoutAPI = (layout) => {
  return fetch(`${config.apiEndPoint}/updateLayout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ layout: layout }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      // TODO: Handle success on UI
    })
    .catch((error) => {
      //TODO: Handle error on UI
      console.error('Error posting layout data...', error);
    });
};
