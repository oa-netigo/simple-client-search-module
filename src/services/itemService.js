const apiClient = {
  get: async (url) => {
    const response = await fetch(`/${url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse JSON response
    return await response.json();
  },
};

export default {
  getItems() {
    return apiClient.get('src/api/items/data.json');
  }
};
