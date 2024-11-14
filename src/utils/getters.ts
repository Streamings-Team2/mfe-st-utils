export function restGet(url: string) {
  console.log(url)
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
