import express from "express";
import cors from "cors";
import CreateRepository from "./services/CreateRepository";
import ValidateRepository from "./services/ValidateRepository";

import Repository from "./models/Repository";

const app = express();

app.use(cors());
app.use(express.json());

const repositories: Array<Repository> = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const repositoryRequest = request.body;
  const validation = CreateRepository(repositoryRequest);
  repositories.push(validation);
  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title } = request.body;
  const validateId = ValidateRepository(id, repositories);

  if (validateId !== undefined) {
    repositories[validateId] = { id, url, title };
    return response.json(repositories[validateId]);
  }

  return response.json({ error: "Id not found" });
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const validateId = ValidateRepository(id, repositories);

  if (validateId !== undefined) {
    repositories.splice(validateId, 1);

    return response.json(repositories);
  }

  return response.json({ error: "Id not found" });
});

export default app;
