const fetchApi = (resource, body) => fetch(
  `/api/${resource.replace('/','')}`, 
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST', 
    body: JSON.stringify(body)
  }
);

export { fetchApi };
