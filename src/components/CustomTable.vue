<template>
  <div class="custom-table-wrapper">
    <table :class="[options.tableClass, verticalLayout ? 'vertical-layout' : 'regular-layout']"
           class="custom-table">
      <thead class="thead">
      <tr class="tr">
        <th v-for="(value, key, index) in options.headers" :key="index"
            class="th">
          <slot v-if="!value" :name="`th-${key}`"/>
          <span v-else class="">{{ value }}</span>
        </th>
      </tr>
      </thead>
      <tbody v-if="data" class="tbody">
      <template v-for="rowData in data" :key="rowData.id">
        <tr :class="{'tr-body-vertical': verticalLayout}" class="tr">
          <td v-for="(value, key, index) in options.headers" :key="index"
              class="td">
            <div v-if="verticalLayout" class="col-th">{{ value }}</div>
            <div :class="{'col-td': verticalLayout}">
              <slot :name="key" :row-data="rowData"/>
            </div>
          </td>
        </tr>
      </template>
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
    },
    verticalLayout: {
      default: true
    }
  }
}
</script>
