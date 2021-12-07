<script lang="ts">
  import Control from "./components/Control.svelte";
  import Table from "./components/Table.svelte";
  import Footer from "./components/Footer.svelte";
  import Peek from "./components/Peek.svelte";
</script>

<main>
  <div class="container is-container">
    <h1 class="title py-6 has-text-centered">Find My Professors! 🎓</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
      sapiente molestiae deleniti tenetur, expedita velit praesentium culpa ut,
      reprehenderit tempore ipsum accusantium possimus laboriosam nihil
      quibusdam maxime harum rem unde?
    </p>
    <Control />
    <div class="columns is-variable is-6">
      <div class="column is-two-thirds">
        <Table />
      </div>
      <div class="column is-one-third">
        <Peek />
      </div>
    </div>
  </div>
</main>
<Footer />

<style>
  h1 {
    font-family: "Pacifico";
    font-size: 3.5rem;
    /* Create the gradient. */
    background-image: linear-gradient(
      109.6deg,
      rgb(62, 161, 219) 11.2%,
      rgb(93, 52, 236) 100.2%
    );
    /* Set the background size and repeat properties. */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
