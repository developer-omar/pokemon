import { computed, onMounted, ref } from "vue";
import { getPokemons } from "../helpers/get-pokemons"
import { Pokemon } from "../interfaces/pokemon";




// export const usePokemons = () => {


//   return {
//     pokemons,
//     isLoading,
//     count: computed(() => pokemons.value.length)
//   }
// }