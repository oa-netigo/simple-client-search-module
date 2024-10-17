<script setup>
import { ref } from 'vue'
import SearchQuery from '@/components/SearchQuery.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import ResultList from '@/components/ResultList.vue'
import ResultPagination from '@/components/ResultPagination.vue'
import { useItems } from '@/composables/useItems';
import { useFilteredItems } from '@/composables/useFilteredItems';
const { items, isLoading, hasError } = useItems();

const updateQuery = (newQuery) => {
  searchQuery.value = newQuery;
  paginationOptions.value.currentPage = 1;
};

const updateFilter = (newFilter) => {
  searchFilter.value = newFilter;
  paginationOptions.value.currentPage = 1;
};

// @TODO: uncheck radio button when reset
const resetFilter = () => {
  searchQuery.value = '';
  searchFilter.value = '';
  paginationOptions.value.currentPage = 1;
};

const updatePage = (newPage) => {
  paginationOptions.value.currentPage = newPage;
};

const searchQuery = ref('');
const searchFilter = ref('');
const searchOptions = ref({
  keys: ['title', 'description'],
});
const paginationOptions = ref({
  itemsPerPage: 4,
  currentPage: 1,
});

const filteredItems = useFilteredItems(items, searchQuery, searchFilter, searchOptions);

</script>

<template>
  <div v-if="!isLoading && !hasError">
    <SearchQuery
      @on-search="updateQuery"
      @on-reset="resetFilter"/>
    <SearchFilter
      :items="items"
      @on-filter="updateFilter"/>
    <ResultList
      :items="items"
      :filtered-items="filteredItems"
      :search-options="searchOptions"
      :search-query="searchQuery"
      :search-filter="searchFilter"
      :pagination-options="paginationOptions"
    />
    <ResultPagination
      :items="items"
      :filtered-items="filteredItems"
      :pagination-options="paginationOptions"
      @on-page-change="updatePage"/>
  </div>
  <div class="list-error"
       v-if="hasError">
    <div class="alert alert-danger" role="alert">
      error occurred!<br>
      {{ hasError }}
    </div>
  </div>
  <div class="list-loading text-center py-3"
       v-if="isLoading"
  >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
