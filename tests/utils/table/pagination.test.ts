import {
  getDataSlice,
  getPagination,
  PaginationData,
} from "../../../src/utils/table/pagination";

describe("getPagination A", () => {
  it("debería devolver los valores predeterminados para itemsPerPage y pageRangeDisplayed", () => {
    const currentPageC = 2;
    const totalItems = 50;

    const result: PaginationData = getPagination(currentPageC, totalItems);

    expect(result.itemsPerPage).toBe(10); // Valor predeterminado
    expect(result.pages.length).toBe(5); // pageRangeDisplayed por defecto es 5
    expect(result.totalPages).toBe(5); // 50 items, 10 por página -> 5 páginas
  });

  it("debería devolver un número correcto de páginas con un valor personalizado para itemsPerPage", () => {
    const currentPageC = 2;
    const totalItems = 50;
    const itemsPerPage = 20; // Cambiamos este valor

    const result: PaginationData = getPagination(
      currentPageC,
      totalItems,
      itemsPerPage
    );

    expect(result.itemsPerPage).toBe(20);
    expect(result.totalPages).toBe(3); // 50 items, 20 por página -> 3 páginas
  });

  it("debería devolver un número correcto de páginas con un valor personalizado para pageRangeDisplayed", () => {
    const currentPageC = 2;
    const totalItems = 50;
    const pageRangeDisplayed = 7;

    const result: PaginationData = getPagination(
      currentPageC,
      totalItems,
      10,
      pageRangeDisplayed
    );

    expect(result.pages.length).toBe(5);
  });

  it("debería manejar un total de items menor que itemsPerPage", () => {
    const currentPageC = 1;
    const totalItems = 5;
    const result: PaginationData = getPagination(currentPageC, totalItems, 10);

    expect(result.totalPages).toBe(1); // Solo una página
  });

  it("debería manejar un total de items igual a un múltiplo exacto de itemsPerPage", () => {
    const currentPageC = 1;
    const totalItems = 20;
    const result: PaginationData = getPagination(currentPageC, totalItems, 10);

    expect(result.totalPages).toBe(2); // 20 items, 10 por página -> 2 páginas
  });

  it("debería manejar un total de items que no sea múltiplo exacto de itemsPerPage", () => {
    const currentPageC = 1;
    const totalItems = 25;
    const result: PaginationData = getPagination(currentPageC, totalItems, 10);

    expect(result.totalPages).toBe(3); // 25 items, 10 por página -> 3 páginas
  });

  it("debería garantizar que currentPageC no sea menor que 1", () => {
    const currentPageC = -5;
    const totalItems = 30;
    const result: PaginationData = getPagination(currentPageC, totalItems);

    expect(result.currentPageC).toBe(1); // currentPageC no debe ser menor que 1
  });

  it("debería garantizar que currentPageC no sea mayor que el número total de páginas", () => {
    const currentPageC = 10;
    const totalItems = 30;
    const result: PaginationData = getPagination(currentPageC, totalItems);

    expect(result.currentPageC).toBe(3); // Solo 3 páginas
  });
});

describe("getDataSlice", () => {
  const data = Array.from({ length: 50 }, (_, i) => i + 1);

  it("debería devolver el slice de datos correcto para la página 1", () => {
    const slicedData = getDataSlice(data, 10, 1);
    expect(slicedData).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("debería devolver el slice de datos correcto para la página 3", () => {
    const slicedData = getDataSlice(data, 10, 3);
    expect(slicedData).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
  });

  it("debería devolver un array vacío si la página es demasiado alta", () => {
    const slicedData = getDataSlice(data, 10, 6);
    expect(slicedData).toEqual([]);
  });

  it("debería devolver todos los elementos restantes si no hay suficientes para una página completa", () => {
    const slicedData = getDataSlice(data, 20, 3);
    expect(slicedData).toEqual([41, 42, 43, 44, 45, 46, 47, 48, 49, 50]);
  });
});
