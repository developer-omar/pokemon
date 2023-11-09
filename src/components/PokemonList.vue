<script setup lang="ts">
import { Pokemon } from '../interfaces/pokemon';
//import { PropType } from 'vue';

defineProps<{
  pokemonList: Pokemon[],
  isLoading: boolean
}>();
</script>

<template>
  <div>
    <h3 v-if="isLoading">Cargando...</h3>
    <table v-if="pokemonList != undefined">
      <tr v-for="pokemon in pokemonList" :key="pokemon.id">
        <td>
          {{ pokemon.name }}
        </td>
        <td>
          <button @click="$emit('pokemonToAdd', pokemon)">+ Agregar</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  table {
    width: 100%;
  }

  td {
    text-transform: capitalize;
  }
</style>
