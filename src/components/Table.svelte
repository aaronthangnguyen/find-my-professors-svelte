<script lang="ts">
  import type Professor from "../types/professor";

  import Row from "./Row.svelte";

  const professors: Professor[] = [
    {
      id: "2444827",
      name: "Ian O'Toole",
      rating: 4.4,
      totalRatings: 14,
      difficulty: 2.6,
      wouldTakeAgain: 79,
    },
    {
      id: "2174158",
      name: "Jessica Anfinson",
      rating: 3.9,
      totalRatings: 28,
      difficulty: 2.6,
      wouldTakeAgain: 79,
    },
    {
      id: "246654",
      name: "Robin Simmons ",
      rating: 4.3,
      totalRatings: 142,
      difficulty: 2.6,
      wouldTakeAgain: 66,
    },
    {
      id: "2570798",
      name: "Ting Tang",
      rating: 4.2,
      totalRatings: 30,
      difficulty: 2.6,
      wouldTakeAgain: 90,
    },
    {
      id: "312763",
      name: "Dennis Hunchuck",
      rating: 4.0,
      totalRatings: 66,
      difficulty: 2.6,
      wouldTakeAgain: 74,
    },
  ];
</script>

<div>
  <h2 class="title">[Course Number] - [Course Name]</h2>
  <table class="table is-hoverable">
    <thead>
      <tr>
        <th><abbr title="Professor ID">ID</abbr></th>
        <th>Name</th>
        <th>Rating</th>
        <th>Total Ratings</th>
        <th>Difficulty</th>
        <th><abbr title="Would Take Again?">Again?</abbr></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Professor ID">ID</abbr></th>
        <th>Name</th>
        <th>Rating</th>
        <th>Total Ratings</th>
        <th>Difficulty</th>
        <th><abbr title="Would Take Again?">Again?</abbr></th>
      </tr>
    </tfoot>
    <tbody>
      {#each professors as professor}
        <Row data={professor} />
      {/each}
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
  }
</style>
