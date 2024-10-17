<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  items: Array,
  isLoading: Boolean,
  hasError: Boolean,
  searchOptions: Object,
  searchQuery: String,
  searchFilter: String
});

const filteredItems = computed(() => {
  return props.items.filter(item => {
    const matchesQuery = props.searchOptions.keys.some(key => {
      return item[key].toLowerCase().includes(props.searchQuery.toLowerCase());
    });
    const matchesFilter = props.searchFilter ? item.category === props.searchFilter : true;
    return matchesQuery && matchesFilter;
  })
})

const noResult = computed(() => {
  return filteredItems.value.length === 0;
})

</script>

<template>
  <div class="result-list py-4">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-start"
          v-for="(item, index) in filteredItems" :key="index">
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{ item.title }}</div>
          {{ item.description }}
        </div>
        <span class="badge text-white rounded-pill" :style="{ background: item.color }">{{ item.category }}</span>
      </li>
    </ul>
    <div class="list-no-result"
         v-if="noResult">no result</div>
  </div>
</template>
