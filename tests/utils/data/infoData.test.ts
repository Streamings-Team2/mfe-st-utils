import { getInitials } from "../../../src/utils/data/infoData";

describe("getInitials", () => {
  it("debería devolver las iniciales del nombre completo con dos nombres", () => {
    expect(getInitials("Juan Perez")).toBe("JP");
  });

  it("debería devolver las iniciales cuando hay más de dos nombres", () => {
    expect(getInitials("Maria Ana Gonzalez")).toBe("MA");
  });

  it("debería devolver la inicial si solo se proporciona un nombre", () => {
    expect(getInitials("Carlos")).toBe("C");
  });

  it("debería devolver una cadena vacía si el nombre es una cadena vacía", () => {
    expect(getInitials("")).toBe("");
  });

  it("debería manejar nombres en minúsculas y devolver las iniciales en mayúsculas", () => {
    expect(getInitials("laura diaz")).toBe("LD");
  });

  it("debería manejar nombres con caracteres especiales", () => {
    expect(getInitials("José Luís")).toBe("JL");
  });

  it("debería manejar nombres con un solo carácter", () => {
    expect(getInitials("A")).toBe("A");
  });
});
