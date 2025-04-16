<template>
  <div class="subapp-container">
    <div id="subapp-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubappView',
});
</script>

<style scoped>
.subapp-container {
  padding: 1rem;
  min-height: 500px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-top: 1rem;
}
</style> 