<script setup>
import { ref } from 'vue';
import SearchQuery from '@/components/SearchQuery.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import ResultList from '@/components/ResultList.vue'

import { useItems } from '@/composables/useItems';

const { items, isLoading, hasError } = useItems();

const updateQuery = (newQuery) => {
  searchQuery.value = newQuery;
};

const updateFilter = (newFilter) => {
  searchFilter.value = newFilter;
};

// @TODO: uncheck radio button when reset
const resetFilter = () => {
  searchQuery.value = '';
  searchFilter.value = '';
};

const searchQuery = ref('');
const searchFilter = ref('');
const searchOptions = ref({
  keys: ['title', 'description'],
});
</script>

<template>
  <div v-if="!isLoading && !hasError">
    <SearchQuery @onSearch="updateQuery" @onReset="resetFilter"/>
    <SearchFilter
      :items="items"
      @filter="updateFilter"/>
    <ResultList
      :items="items"
      :searchOptions="searchOptions"
      :searchQuery="searchQuery"
      :searchFilter="searchFilter"
    />
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
