import { Writable, writable } from "svelte/store";
import type Course from "../types/course";

export const courses: Writable<Course[]> = writable([]);
