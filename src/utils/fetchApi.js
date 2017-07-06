const fetchApi = (resource, body) => fetch(
  `http://localhost:4000/${resource.replace('/','')}`, 
  {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(body)
  }
);

export { fetchApi };
