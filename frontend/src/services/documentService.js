import api from "./api";

export async function getDocuments() {
  const response = await api.get("/documents");

  console.log(
    "📋 Documents API response:",
    JSON.stringify(response.data, null, 2)
  );

  return response.data.documents || [];
}
