import { Writable, writable } from "svelte/store";
import type School from "../types/school";

export const schools: Writable<School[]> = writable([]);
