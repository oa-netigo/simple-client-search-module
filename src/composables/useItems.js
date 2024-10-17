import { ref, onMounted } from 'vue';
import itemService from '@/services/itemService';

export function useItems() {
  const items = ref([]);
  const isLoading = ref(true);
  const hasError = ref(false);

  const fetchItems = async () => {
    try {
      // Simulate a sleep via timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const data = await itemService.getItems();
      items.value = data;
    } catch (err) {
      hasError.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchItems);

  return {
    items,
    isLoading,
    hasError,
  };
}
