import { Writable, writable } from "svelte/store";

export const areas: Writable<string[]> = writable([]);
