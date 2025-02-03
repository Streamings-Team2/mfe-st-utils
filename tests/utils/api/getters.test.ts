import { restGet, restGetHeaders } from "../../../src/utils/api/getters";

// Mockear global.fetch
global.fetch = jest.fn();

describe("getFunctions", () => {
  const mockUrl = "https://api.example.com/data";

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe("restGet", () => {
    it("debería retornar datos en una solicitud exitosa", async () => {
      const mockData = { message: "Hello World" };

      // Simulando una respuesta exitosa con datos
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      });

      const data = await restGet(mockUrl);
      expect(data).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(mockUrl, { method: "GET" });
    });

    it("debería lanzar un error si la respuesta no es exitosa", async () => {
      // Simulando una respuesta con error
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      });

      await expect(restGet(mockUrl)).rejects.toThrow("Error de red: 500");
    });
  });

  describe("restGetHeaders", () => {
    it("debería retornar datos en una solicitud exitosa con headers", async () => {
      const mockData = { message: "Hello with headers" };
      const mockHeaders = { Authorization: "Bearer token123" };

      // Simulando una respuesta exitosa con headers
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      });

      const data = await restGetHeaders(mockUrl, mockHeaders);
      expect(data).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        method: "GET",
        headers: mockHeaders,
      });
    });

    it("debería lanzar un error si la respuesta no es exitosa", async () => {
      const mockHeaders = { Authorization: "Bearer token123" };

      // Simulando una respuesta con error
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });

      await expect(restGetHeaders(mockUrl, mockHeaders)).rejects.toThrow(
        "Error de red: 404"
      );
    });
  });
});
