<script lang="ts">
  import Row from "./Row.svelte";
</script>

<div>
  <h2 class="title">Table - HUM 1020 - Introduction to Humanities</h2>
  <table class="table is-hoverable">
    <thead>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th>Name</th>
        <th>Rating</th>
        <th>Total ratings</th>
        <th><abbr title="Would take again?">Again?</abbr></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th>Name</th>
        <th>Rating</th>
        <th>Total ratings</th>
        <th><abbr title="Would take again?">Again?</abbr></th>
      </tr>
    </tfoot>
    <tbody>
      <tr
        ><th>1</th>
        <td>Professor A</td>
        <td>3.6</td>
        <td>212</td>
        <td>69%</td>
      </tr>
      <tr class="is-selected"
        ><th>2</th>
        <td>Professor B</td>
        <td>3.6</td>
        <td>212</td>
        <td>59%</td>
      </tr>
      <tr
        ><th>3</th>
        <td>Professor C</td>
        <td>4.0</td>
        <td>212</td>
        <td>100%</td>
      </tr>
      <Row />
    </tbody>
  </table>
</div>

<style>
  table {
    width: 100%;
  }
  .table tr.is-selected {
    background-color: rgb(83, 86, 231);
  }
</style>
