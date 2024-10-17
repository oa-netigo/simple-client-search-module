<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
// const searchQueryHelper = useTemplateRef('search-query-info');

const emit = defineEmits(['onSearch', 'onReset']);
const search = () => {
  if (searchQuery.value !== '' && searchQuery.value.length < 2) {
    return;
  }
  emit('onSearch', searchQuery.value);
};

const reset = () => {
  searchQuery.value = '';
  emit('onReset');
};

const showSearchQueryInfo = computed(() => {
  return searchQuery.value.length < 2;
});
</script>

<template>
  <div class="mb-3">
    <label for="search-query-input" class="form-label">Search Query</label>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Type something" aria-label="search query info" aria-describedby="searchQueryInfo" id="search-query-input"
             v-model="searchQuery"
             @input="search">
      <button @click="reset" class="btn btn-outline-secondary" type="button" id="search-filter-reset">Reset</button>
    </div>
    <div v-if="showSearchQueryInfo" id="searchQueryInfo" class="form-text"
         ref="search-query-info">Search query must be at least 2 characters long.</div>
  </div>
</template>
