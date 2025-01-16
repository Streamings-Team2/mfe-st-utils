export function restGet(url: string) {
  return fetch(url, { method: "GET" }).then((response) => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    return response.json();
  });
}

export function restGetHeaders(url: string, headers: any) {
  return fetch(url, {
    method: "GET",
    headers: headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }
    return response.json();
  });
}

const getFunctions = {
    restGet,
    restGetHeaders
}

export default getFunctions;
