<template>
  <div class="shipment-overview-wrapper">
    <div v-if="dataReady" class="card card-table">
      <div class="card-header">
        <h2 class="title-card">Shipment Overview</h2>
        <p class="title-info-card">{{ tableData.length }} out of {{ totalCount }}</p>
      </div>
      <CustomTable :data="tableData" :options="tableOptions">
        <template #id="props">{{ props.rowData.id }}</template>
        <template #senderText="props">{{ props.rowData.senderText }}</template>
        <template #senderAddressText="props">{{ props.rowData.senderAddressText }}</template>
        <template #receiverText="props">{{ props.rowData.receiverText }}</template>
        <template #receiverAddressText="props">{{ props.rowData.receiverAddressText }}</template>
        <template #serviceCodeText="props">{{ props.rowData.serviceCodeText }}</template>
        <template #createdAtText="props">{{ props.rowData.createdAtText }}</template>
        <template #statusText="props">
          <span v-if="props.rowData.status === 1" class="badge bg-gradient-warning">
            {{ props.rowData.statusText }}
          </span>
          <span v-else-if="props.rowData.status === 2" class="badge bg-gradient-info">
            {{ props.rowData.statusText }}
          </span>
          <span v-else class="badge bg-gradient-success">
            {{ props.rowData.statusText }}
          </span>
        </template>
      </CustomTable>
      <Pagination
          :total="total"
          :current="current"
          @on-page-size-update="updatePageSize"
          @on-page-update="onPageUpdate"/>
    </div>
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable';
import Pagination from '@/components/Pagination';
import Shipment from '@/models/Shipment';

export default {
  name: 'Overview',
  components: {
    CustomTable,
    Pagination
  },
  data: () => ({
    // for CustomTable
    tableOptions: {
      tableClass: 'table-shipments',
      headers: {
        'id': 'ID',
        'senderText': 'Sender',
        'senderAddressText': 'Sender Address',
        'receiverText': 'Receiver',
        'receiverAddressText': 'Receiver Address',
        'serviceCodeText': 'Service Code',
        'createdAtText': 'Created Date',
        'statusText': 'Status'
      }
    },
    tableData: undefined,
    // for Pagination
    total: 0,
    current: 1,
    pageSize: 20,
    totalCount: 0,
    dataReady: false
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize: function () {
      this.current = this.$route.query.page ? this.$route.query.page : 1;
      this.getShipments({page: this.current, pageSize: this.pageSize});
    },
    onPageUpdate: function (page) {
      this.getShipments({page, pageSize: this.pageSize});
    },
    updatePageSize: function (pageSize) {
      this.pageSize = pageSize;
      this.getShipments({page: 1, pageSize});
    },
    getShipments: function ({page, pageSize}) {
      // here frontend models are used to set API returned data in order to render table
      // check models folder, CustomTable and Pagination component
      this.$store.dispatch('getShipments', {page, pageSize}).then(response => {
        this.tableData = response.data.map(shipment => Shipment.parseFromDataObject(shipment));
        this.total = response.last_page;
        this.current = response.current_page;
        this.totalCount = response.total;
        this.dataReady = true;
      });
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/css/_base.mixins.scss";

.shipment-overview-wrapper {
  padding: rem(60) 0 rem(80);
}

.card-table {
  padding: rem(20) 0 rem(40);
}
</style>
