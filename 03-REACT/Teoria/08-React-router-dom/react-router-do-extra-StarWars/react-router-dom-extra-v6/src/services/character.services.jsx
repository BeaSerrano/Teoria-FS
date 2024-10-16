import { listCharacter } from "../data/app.data";

export const getAll = () => listCharacter;

export const getById = (id) => listCharacter.find((item) => item._id == id);

export const getByName = (name) => listCharacter.filter((item) => item.name.includes(name))