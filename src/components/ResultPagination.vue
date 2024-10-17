<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  items: Array,
  filteredItems: Array,
  paginationOptions: Object,
});

const totalPages = computed(() => {
  return Math.ceil(props.filteredItems.length / props.paginationOptions.itemsPerPage);
});

const emit = defineEmits(['onPageChange']);

const onPageChange = (page) => {
  if (page < 1 || page > totalPages.value) {
    return;
  }
  emit('onPageChange', page);
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item"
          :class="{ disabled: props.paginationOptions.currentPage === 1 }">
        <a class="page-link" href="#" aria-label="Previous"
           @click.prevent="onPageChange(props.paginationOptions.currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
          v-for="(page, index) in totalPages" :key="index">
        <a class="page-link" href="#"
           :class="{active: index + 1 === props.paginationOptions.currentPage}"
           @click.prevent="onPageChange(index + 1)">{{ index + 1}}</a></li>
      <li class="page-item"
          :id="props.paginationOptions.currentPage"
        :class="{disabled: props.paginationOptions.currentPage === totalPages}">
        <a class="page-link" href="#" aria-label="Next"
           @click.prevent="onPageChange(props.paginationOptions.currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
