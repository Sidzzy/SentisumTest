import config from '../src/config';

export const getDashboardData = (setDashboardData) => {
  fetch(`${config.apiEndPoint}/dashboard`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setDashboardData(data);
    })
    .catch((error) => {
      //TODO: Handle error on UI
      console.error('Error fetching dashboard data:', error);
    });
};
