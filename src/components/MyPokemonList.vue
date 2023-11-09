<script setup lang="ts">
import { Pokemon } from '../interfaces/pokemon';

defineProps<{
  selectedPokemons: Pokemon[]
}>();

</script>

<template>
  <table>
    <tr v-for="pokemon in selectedPokemons" :key="pokemon.id">
      <td>
        {{ pokemon.name }}
      </td>
      <td>
        <button @click="$emit('pokemonToRemove', pokemon)">
          Eliminar
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
  table {
    width: 100%;
  }

  td {
    width: 50%;
  }
</style>