<script setup lang="ts">
defineProps<{
  name: string
}>();
</script>

<template>
  <div>
    <form action="">
      <input
        type="text"
        name="pokemonName"
        id="pokemonName"
        placeholder="Nombre Pokemon"
        :value="name"
        @input="$emit('nameToSearch',($event.target as HTMLInputElement).value)"
      >
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>