<script lang="ts">
  import { selectedRow } from "../stores/selectedRow";
  import type Professor from "../types/professor";

  const initialData: Professor = {
    id: "0",
    name: "",
    rating: 0,
    difficulty: 0,
    totalRatings: 0,
    wouldTakeAgain: 0,
  };
  export let data = initialData;
  const { id, name, rating, totalRatings, difficulty, wouldTakeAgain } = data;

  const handleSelect = () => {
    $selectedRow = id;
  };
</script>

<tr class={$selectedRow == id ? "is-selected" : ""} on:click={handleSelect}
  ><th>{id}</th>
  <td>{name}</td>
  <td>{rating}</td>
  <td>{totalRatings}</td>
  <td>{difficulty}</td>
  <td>{wouldTakeAgain}%</td>
</tr>

<style>
  tr.is-selected {
    background-color: rgb(83, 86, 231);
  }
  tr {
    cursor: pointer;
  }
</style>
