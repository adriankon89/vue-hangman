<template>
  <div>
    <AlphabetComponent
      :isWordGuessed="isWordGuessed"
      v-model:clickedLetters="clickedLetters"
      @letter-clicked="handleLetterClick"
    />
    <GuessWordComponent :selected-letters="selectedLetters" @word-is-guessed="handleWordGuessed" />
    <button
      @click="startNewGame"
      class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
    >
      Start New Game
    </button>
  </div>
</template>

<script setup>
import AlphabetComponent from './components/AlphabetComponent.vue'
import GuessWordComponent from './components/GuessWordComponent.vue'

import { ref } from 'vue'

const selectedLetters = ref([])
const clickedLetters = ref([])
const isWordGuessed = ref(false)

function handleLetterClick(letter) {
  if (!selectedLetters.value.includes(letter)) {
    selectedLetters.value.push(letter)
  }
}

function handleWordGuessed(isGuessed) {
  isWordGuessed.value = isGuessed
}

function startNewGame() {
  selectedLetters.value = []
  clickedLetters.value = []
  isWordGuessed.value = false
}
</script>
