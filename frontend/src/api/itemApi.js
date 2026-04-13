import API from './axios';

export const itemApi = {
  // Fetches all items for the authenticated user
  getItems: () => API.get('/items'),
  
  // Creates a new item in the MySQL database
  createItem: (data) => API.post('/items', data),
  
  // Updates an existing item
  updateItem: (id, data) => API.put(`/items/${id}`, data),
  
  // Deletes an item from the database
  deleteItem: (id) => API.delete(`/items/${id}`),
};