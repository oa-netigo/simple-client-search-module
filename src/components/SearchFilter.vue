<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  items: Array
});

const searchFilter = ref('');
const emit = defineEmits(['onFilter']);
const onFilter = () => {
  emit('onFilter', searchFilter.value);
};

const uniqueCategories = ref([]);
const categoriesSet = new Set();

props.items.forEach(item => {
  if (!categoriesSet.has(item.category)) {
    categoriesSet.add(item.category);
    uniqueCategories.value.push(item);
  }
});
</script>

<template>
  <div class="search-filter">
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic radio toggle button group">
      <template v-for="(item, index) in uniqueCategories" :key="index">
        <input type="radio" class="btn-check" name="filter-category" :id="'filter-' + index" autocomplete="off" :value="item.category"
               v-model="searchFilter" @change="onFilter">
        <label class="btn btn-outline-primary" :for="'filter-' + index">{{ item.category }}</label>
      </template>
    </div>
  </div>
</template>
