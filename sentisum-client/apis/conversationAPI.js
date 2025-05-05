import config from '../src/config';

export const getConversationData = async (startDate, endDate) => {
  // Construct the query parameters
  const queryParams = new URLSearchParams({
    startDate,
    endDate,
  });

  const data = await fetch(
    `${config.apiEndPoint}/conversations?${queryParams.toString()}`
  );
  return await data.json();
};
