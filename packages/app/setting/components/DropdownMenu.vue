<template>
  <div class="dropdown-menu" :class="dropdownClass" :style="dropdownStyle">
    <div class="selected-option" @click="toggleDropdown">
      <span>{{ selectedOption.label }}</span>
      <i class="fas fa-chevron-down"></i>
    </div>
    <div class="dropdown-items" v-show="isDropdownOpen">
      <div
          class="dropdown-item"
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
      >
        <span>{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, CSSProperties} from 'vue';

interface Option {
  value: any;
  label: string;
}

const props = defineProps<{
  options: Option[];
  defaultValue: any;
  class?: string;
  style?: CSSProperties;
}>();

const emit = defineEmits<{
  (e: 'option-selected', value: any): void;
}>();

const isDropdownOpen = ref(false);
const selectedOption = ref<Option>(props.options.find(option => option.value === props.defaultValue) || props.options[0]);

const dropdownClass = computed(() => props.class || '');
const dropdownStyle = computed(() => props.style || {});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option: Option) => {
  selectedOption.value = option;
  isDropdownOpen.value = false;
  emit('option-selected', option.value);
};
</script>

<style scoped>
.dropdown-menu {
  position: relative;
  display: inline-block;
}

.selected-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-items {
  width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>