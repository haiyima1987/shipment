<template>
  <div class="custom-table-wrapper">
    <table :class="options.tableClass" class="custom-table table table-flush">
      <thead class="thead-light">
      <tr class="head-custom-table">
        <th v-for="(value, key, index) in options.headers" :key="index"
            class="cell-custom-table text-uppercase text-secondary text-xxs font-weight-bolder">
          <slot v-if="!value" :name="`${key}-header`"/>
          <span v-else class="opacity-7">{{ value }}</span>
        </th>
      </tr>
      </thead>
      <tbody v-if="data">
      <tr v-for="rowData in data" :key="rowData.id"
          class="row-custom-table">
        <td v-for="(value, key, index) in options.headers" :key="index"
            class="cell-custom-table text-sm">
          <slot :name="key" :row-data="rowData"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    options: {
      required: true
    },
    data: {
      required: true
    }
  }
}
</script>
