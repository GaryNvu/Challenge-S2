<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Products</h5>
    </div>

    <div class="card-body">
      <ul class="list-group">
        <h5>Game</h5>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="Pokemon"
            id="Pokemon"
          />

          <label class="form-check-label" for="Pokemon">Pokemon</label>
        </li>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="YuGiOh"
            id="YuGiOh"
          />

          <label class="form-check-label" for="YuGiOh">Yu-Gi-Oh!</label>
        </li>

        <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Magic" id="Magic" />

          <label class="form-check-label" for="Magic">Magic</label>
        </li>

        <h5 class="mt-2">Category</h5>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="Booster"
            id="Booster"
          />

          <label class="form-check-label" for="Booster">Booster</label>
        </li>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="Sleeve"
            id="Sleeve"
          />

          <label class="form-check-label" for="Sleeve">Sleeve</label>
        </li>

        <li class="list-group-item">
          <input class="form-check-input me-1" type="checkbox" value="Pack" id="Pack" />

          <label class="form-check-label" for="Pack">Pack</label>
        </li>

        <h5 class="mt-2">Stock</h5>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="InStock"
            id="InStock"
          />

          <label class="form-check-label" for="InStock">In Stock</label>
        </li>

        <li class="list-group-item">
          <input
            class="form-check-input me-1"
            type="checkbox"
            value="NotAvailable"
            id="NotAvailable"
          />

          <label class="form-check-label" for="NotAvailable">Not available</label>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Filters",
};
</script>
<style></style>
