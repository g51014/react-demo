import { generateAxiosInstance } from "@utilities/api/http";

const httpClient = generateAxiosInstance(
  "https://jsonplaceholder.typicode.com"
);

export default httpClient;
