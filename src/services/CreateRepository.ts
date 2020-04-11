import { v4 } from "uuid";
import Repository from "../models/Repository";

export default function CreateRepository({ title, url }: Repository) {
  return {
    id: v4(),
    title,
    url,
  };
}
