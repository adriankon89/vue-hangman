<template>
  <div>
    <AlphabetComponent
      v-model:clickedLetters="clickedLetters"
      :isWordGuessed="isWordGuessed"
      :isRunning="isClockRunning"
      @letter-clicked="handleLetterClick"
    />
    <ClockComponent ref="clockRef" :isRunning="isClockRunning" @time-updated="updateElapsedTime" />
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
import { ref } from 'vue'
import ClockComponent from './components/ClockComponent.vue'
import AlphabetComponent from './components/AlphabetComponent.vue'
import GuessWordComponent from './components/GuessWordComponent.vue'

const selectedLetters = ref([])
const clickedLetters = ref([])
const isWordGuessed = ref(false)
const isClockRunning = ref(false)
const elapsedTime = ref(0)

const clockRef = ref(null)

function handleLetterClick(letter) {
  if (!selectedLetters.value.includes(letter)) {
    selectedLetters.value.push(letter)
  }
}

function handleWordGuessed(isGuessed) {
  isWordGuessed.value = isGuessed
  isClockRunning.value = !isGuessed
}

function startNewGame() {
  selectedLetters.value = []
  clickedLetters.value = []
  isWordGuessed.value = false
  isClockRunning.value = true

  if (clockRef.value) {
    clockRef.value.resetClock()
  }
}

function updateElapsedTime(seconds) {
  elapsedTime.value = seconds
}
</script>
