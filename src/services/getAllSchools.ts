import { API_URL } from "../env/apiUrl";

export const getAllSchools = async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: "query GetSchools {querySchool(order: {desc: name}) {name}}",
    }),
  });
  const data = await response.json();
  return data.data.querySchool;
};
