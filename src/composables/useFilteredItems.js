import { computed } from 'vue';

export function useFilteredItems(items, searchQuery, searchFilter, searchOptions) {
  return computed(() => {
    return items.value.filter(item => {
      const matchesQuery = searchOptions.value.keys.some(key => {
        return item[key].toLowerCase().includes(searchQuery.value.toLowerCase());
      });

      const matchesFilter = searchFilter.value ? item.category === searchFilter.value : true;
      return matchesQuery && matchesFilter;
    });
  });
}
