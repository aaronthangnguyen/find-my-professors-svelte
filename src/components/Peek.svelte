<script lang="ts">
  import { selectedRow } from "../stores/selectedRow";
</script>

<div>
  <h2 class="title">Reviews</h2>
  {#if $selectedRow === ""}
    <h3
      class="is-size-5 has-text-grey has-text-centered has-text-weight-medium"
    >
      Just chilling...
    </h3>
  {:else}
    <iframe
      id="iframe"
      src={`https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${$selectedRow}`}
      title="Rate My Professors"
    />
  {/if}
</div>

<style>
  iframe {
    width: 100%;
    height: 400px;
  }
</style>
