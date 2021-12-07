import { API_URL } from "../env/apiUrl";

export const getAllCourses = async (school) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query GetCourses($school: String) {
              querySchool(filter:{name: {allofterms: $school}}) {
                  courses (order: {asc: code}, first: 10000){
                      code
                  }
              }
          }`,
      variables: {
        school: school,
      },
    }),
  });
  const data = await response.json();
  return data.data.querySchool[0].courses;
};
