const apiClient = {
  get: async (url) => {
    try {
      const response = await fetch(`/${url}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw new Error('Failed to fetch data');
    }
  },
};

export default {
  getItems() {
    return apiClient.get('api/items/data.json');
  }
};
