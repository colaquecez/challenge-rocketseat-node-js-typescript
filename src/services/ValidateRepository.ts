import Repository from "../models/Repository";

export default function ValidateRepository(
  id: string,
  repositories: Array<Repository>
) {
  const findIndex = repositories.findIndex((item) => item.id === id);

  if (findIndex > -1) {
    return findIndex;
  }

  return undefined;
}
