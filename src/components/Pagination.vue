<template>
  <div class="pagination-wrapper">
    <div class="page-size-wrapper">
      <div class="page-size-box">
        <div class="validator-custom-select-wrapper">
          <div class="validator-cs-text-wrapper"
               @click="togglePageSizeSelect($event)">
            <div v-if="selectedOption" class="selected-text-validator-cs">{{ selectedOption }}</div>
            <div v-else class="placeholder-validator-cs">{{ options[0] }}</div>
          </div>
          <div v-if="isOpen" class="validator-cs-option-list-wrapper">
            <div v-for="(option, index) in options" :key="index"
                 class="option-validator-cs"
                 @click="handlePageSizeClick($event, option)">
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="totalPage > 1" class="pagination-button-wrapper">
      <router-link
          v-if="currentPage > 1"
          class="button-page-number navigation"
          :to="{name: $route.name, query: {page: currentPage - 1}}"
          @click="previousPage">
        <font-awesome-icon icon="chevron-left" class="fa-chevron-left"/>
      </router-link>
      <router-link
          v-if="dotsFirst"
          class="button-page-number first-page"
          :to="{name: $route.name, query: {page: 1}}"
          @click="updatePage(1)">
        1
      </router-link>
      <div v-if="dotsFirst" class="dots">...</div>
      <router-link
          v-for="(number, index) in displayedPageNumbers" :key="index"
          :class="{'active': currentPage === number}"
          :to="{name: $route.name, query: {page: number}}"
          class="button-page-number"
          @click="updatePage(number)">
        {{ number }}
      </router-link>
      <div v-if="dotsLast" class="dots">...</div>
      <router-link
          v-if="dotsLast"
          class="button-page-number last-page"
          :to="{name: $route.name, query: {page: total}}"
          @click="updatePage(totalPage)">
        {{ total }}
      </router-link>
      <router-link
          v-if="currentPage < totalPage"
          class="button-page-number navigation"
          :to="{name: $route.name, query: {page: currentPage + 1}}"
          @click="nextPage">
        <font-awesome-icon icon="chevron-right" class="fa-chevron-right"/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    maxPageNumberShown: {
      type: Number,
      required: false,
      default: 5
    },
    current: {
      type: Number,
      required: true,
      default: 1
    },
    pageSizeOptions: {
      default: [10, 20, 50, 100]
    }
  },
  emits: ['on-page-update', 'on-page-size-update'],
  data: () => ({
    currentPage: 1,
    totalPage: 1,
    displayedPageNumbers: [],
    dotsLast: false,
    dotsFirst: false,
    options: [10, 20, 50, 100],
    selectedOption: 20,
    isOpen: false
  }),
  watch: {
    current: function (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.initNumbers();
      if (this.totalPage > this.$props.maxPageNumberShown + 1) {
        this.updateDisplayedPageNumbers();
      }
    },
    total: function (newVal, oldVal) {
      if (newVal === oldVal) return;
      this.initNumbers();
      this.initializeDisplayedPageNumbers();
      // if (this.totalPage > this.$props.maxPageNumberShown + 1) {
      //   this.updateDisplayedPageNumbers();
      // }
    }
  },
  created() {
    this.initializeDisplayedPageNumbers();
  },
  methods: {
    togglePageSizeSelect: function (e) {
      e.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    handlePageSizeClick: function (e, option) {
      e.stopPropagation();
      this.isOpen = false;
      this.selectedOption = option;
      this.$router.push({query: {page: 1}})
      this.$emit('on-page-size-update', option);
    },
    previousPage: function () {
      this.$emit('on-page-update', this.currentPage - 1);
    },
    nextPage: function () {
      this.$emit('on-page-update', this.currentPage + 1);
    },
    updatePage: function (pageNumber) {
      this.$emit('on-page-update', pageNumber);
    },
    updateDisplayedPageNumbers: function () {
      let first = this.displayedPageNumbers[0];
      let last = this.displayedPageNumbers[this.displayedPageNumbers.length - 1];
      if (this.currentPage >= last) {
        this.resetPageArray(this.currentPage, this.currentPage + this.$props.maxPageNumberShown - 1);
      } else if (this.currentPage <= first) {
        this.resetPageArray(this.currentPage - this.$props.maxPageNumberShown + 1, this.currentPage);
      }
    },
    resetPageArray: function (low, high) {
      if (high >= this.totalPage) {
        high = this.totalPage;
        low = high - this.$props.maxPageNumberShown + 1;
      } else if (low <= 1) {
        low = 1;
        high = low + this.$props.maxPageNumberShown - 1;
      }
      this.displayedPageNumbers = [];
      for (let i = low; i <= high; i++) {
        this.displayedPageNumbers.push(i);
      }
      this.dotsFirst = this.displayedPageNumbers[0] !== 1;
      this.dotsLast = this.displayedPageNumbers[this.displayedPageNumbers.length - 1] < this.totalPage;
    },
    initializeDisplayedPageNumbers: function () {
      this.initNumbers();
      let high = this.totalPage > this.$props.maxPageNumberShown ? this.$props.maxPageNumberShown : this.totalPage;
      this.displayedPageNumbers = [];
      for (let i = 1; i <= high; i++) {
        this.displayedPageNumbers.push(i);
      }
      this.dotsLast = this.totalPage > this.$props.maxPageNumberShown;
      if (Number(this.current) === 1) return;
      if (this.totalPage > this.$props.maxPageNumberShown + 1) {
        this.updateDisplayedPageNumbers();
      }
    },
    initNumbers: function () {
      this.currentPage = Number(this.$props.current);
      this.totalPage = Number(this.$props.total);
    }
  }
}
</script>
