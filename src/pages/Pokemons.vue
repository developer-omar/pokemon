<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { computed, ref } from 'vue';

import { getPokemons } from "../helpers/get-pokemons";
import FilterForm from "../components/FilterForm.vue";
import PokemonList from "../components/PokemonList.vue";
import MyPokemonList from "../components/MyPokemonList.vue";
import { Pokemon } from '../interfaces/pokemon';


const { isLoading, data:pokemons } = useQuery(["pokemons"], getPokemons);
const count = computed(() => pokemons.value?.length ?? 0); // retorna 0 si length es null o undefined

const showErrorMessage = ref(false);
const selectedPokemons = ref<Pokemon[]>([]);
const addToSelectedPokemons = (pokemonParam:Pokemon) => {
  for (const pokemon of selectedPokemons.value) {
    if(pokemon.id == pokemonParam.id) {
      // show a error message if there is a pokemon in selectedPokemons
      showErrorMessage.value = true;
      setTimeout(() => {
        showErrorMessage.value = false;
      }, 3000);
      return;
    }
  }
  selectedPokemons.value.push(pokemonParam);
}

const removeFronSelectedPokemons = (pokemonParam:Pokemon) => {
  selectedPokemons.value = selectedPokemons.value.filter(pokemon => pokemonParam.id != pokemon.id);
}

const pokemonName = ref("");
const filterPokemonList = computed(() => {
  if (!pokemonName.value)
    return pokemons.value;
  return pokemons.value?.filter(pokemon => pokemon.name.includes(pokemonName.value));
});

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-100">
        <FilterForm
          :name="pokemonName"
          @name-to-search="name => pokemonName = name"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-50">
        <h1>Pokemon List {{ count }}</h1>
        <!-- <PokemonList @set-pokemon="setPokemon2" /> -->
        <PokemonList
          :pokemon-list="filterPokemonList ?? []"
          :isLoading="isLoading"
          @pokemon-to-add="addToSelectedPokemons"
        />
      </div>
      <div class="col-50">
        <h1>My Pokemon List</h1>
        <h5 v-if="showErrorMessage">
          El Pokemon ya existe en la lista de seleccionados
        </h5>
        <!-- <MyPokemonList :myList="myList"/> -->
        <MyPokemonList
          :selected-pokemons="selectedPokemons ?? []"
          @pokemon-to-remove="removeFronSelectedPokemons"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 15px 0;
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.col-100 {
  width: 100%;
  padding: 15px;
}

.col-50 {
  width: 50%;
  padding: 15px;
}
</style>
