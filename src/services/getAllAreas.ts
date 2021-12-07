import type Course from "../types/course";

export const getAllAreas = (courses: Course[]) => {
  const regex = /^[A-Z]+/g;
  const areas = courses.map((course) => course.code.match(regex)[0]);
  const uniqueAreas = [...new Set(areas)];
  return uniqueAreas;
};
