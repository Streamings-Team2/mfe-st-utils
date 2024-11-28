import getFunctions from '../../src/utils/getters';
global.fetch = jest.fn();

// Limpiar mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

describe('restGet', () => {
  it('debería hacer una solicitud GET y devolver los datos en formato JSON', async () => {
    // Datos que vamos a "mockear" como respuesta
    const mockResponse = { data: 'some data' };

    // Configuración del mock de fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const url = 'https://api.example.com/data';
    const result = await getFunctions.restGet(url);

    expect(fetch).toHaveBeenCalledWith(url, { method: 'GET' });  // Verificar que fetch se llama con los parámetros correctos
    expect(result).toEqual(mockResponse);  // Verificar que la respuesta es la esperada
  });

  it('debería lanzar un error si la respuesta no es ok', async () => {
    // Configuración del mock para que simule un error de red
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    const url = 'https://api.example.com/data';

    // Verificar que la función lanza un error
    await expect(getFunctions.restGet(url)).rejects.toThrow('Error de red: 404');
  });
});

describe('restGetHeaders', () => {
  it('debería hacer una solicitud GET con headers y devolver los datos en formato JSON', async () => {
    // Datos que vamos a "mockear" como respuesta
    const mockResponse = { data: 'some data' };

    // Configuración del mock de fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const url = 'https://api.example.com/data';
    const headers = { 'Authorization': 'Bearer token' };
    const result = await getFunctions.restGetHeaders(url, headers);

    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: headers,
    });
    expect(result).toEqual(mockResponse);
  });

  it('debería lanzar un error si la respuesta no es ok', async () => {
    // Configuración del mock para simular un error
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    const url = 'https://api.example.com/data';
    const headers = { 'Authorization': 'Bearer token' };

    await expect(getFunctions.restGetHeaders(url, headers)).rejects.toThrow('Error de red: 500');
  });
});
