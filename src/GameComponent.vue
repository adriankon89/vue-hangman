<template>
  <div>
    <AlphabetComponent
      v-model:clickedLetters="clickedLetters"
      :isWordGuessed="isWordGuessed"
      :isRunning="isClockRunning"
      @letter-clicked="handleLetterClick"
    />
    <ClockComponent ref="clockRef" :isRunning="isClockRunning" @time-updated="updateElapsedTime" />
    <GuessWordComponent
      :wordToGuess="word"
      :selected-letters="selectedLetters"
      :category="category"
      :difficulty="difficulty"
      @word-is-guessed="handleWordGuessed"
    />
    <div class="flex justify-center mt-12">
      <button
        @click="startNewGame"
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Start New Game
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ClockComponent from './components/ClockComponent.vue'
import AlphabetComponent from './components/AlphabetComponent.vue'
import GuessWordComponent from './components/GuessWordComponent.vue'

const selectedLetters = ref([])
const clickedLetters = ref([])
const isWordGuessed = ref(false)
const isClockRunning = ref(false)
const elapsedTime = ref(0)
const word = ref('')
const category = ref('')
const difficulty = ref(0)
const clockRef = ref(null)

async function fetchWord() {
  try {
    const response = await axios.get('http://localhost:3000/words/random')
    word.value = response.data.word.word
    category.value = response.data.word.category
    difficulty.value = response.data.word.difficulty
  } catch (error) {
    console.error('Error fetching word:', error)
  }
}

function handleLetterClick(letter) {
  if (!selectedLetters.value.includes(letter)) {
    selectedLetters.value.push(letter)
  }
}

function handleWordGuessed(isGuessed) {
  isWordGuessed.value = isGuessed
  isClockRunning.value = !isGuessed
}

async function startNewGame() {
  selectedLetters.value = []
  clickedLetters.value = []
  isWordGuessed.value = false
  isClockRunning.value = true
  await fetchWord()
  if (clockRef.value) {
    clockRef.value.resetClock()
  }
}

function updateElapsedTime(seconds) {
  elapsedTime.value = seconds
}
</script>
