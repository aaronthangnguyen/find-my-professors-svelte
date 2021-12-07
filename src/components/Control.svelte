<script lang="ts">
  import { onMount } from "svelte";
  import { getAllAreas } from "../services/getAllAreas";
  import { getAllCourses } from "../services/getAllCourses";
  import { getAllSchools } from "../services/getAllSchools";
  import { areas } from "../stores/areas";
  import { courses } from "../stores/courses";

  import { schools } from "../stores/schools";

  onMount(async () => {
    $schools = await getAllSchools();
    $courses = await getAllCourses("Valencia College");
    $areas = getAllAreas($courses);
  });
</script>

<div class="mb-6">
  <div class="is-flex is-justify-content-center	">
    <div class="select mr-4">
      <select id="school-select">
        <option disabled selected>School</option>
        {#each $schools as school}
          <option>{school.name}</option>
        {/each}
      </select>
    </div>
    <div class="select mr-2">
      <select id="area-select">
        <option disabled selected>Area</option>
        {#each $areas as area}
          <option>{area}</option>
        {/each}
      </select>
    </div>

    <div class="select mr-4">
      <select id="course-select">
        <option disabled selected>Course</option>
        {#each $courses as course}
          <option>{course.code}</option>
        {/each}
      </select>
    </div>
    <button class="button has-text-white"> Search </button>
  </div>
</div>

<style>
  select,
  button {
    border-radius: 8px;
  }
  button {
    background-color: rgb(83, 86, 231);
    padding-left: 2rem;
    padding-right: 2rem;
  }
  #school-select {
    width: 16rem;
  }
  #area-select {
    width: 6rem;
  }
  #course-select {
    width: 10rem;
  }
</style>
