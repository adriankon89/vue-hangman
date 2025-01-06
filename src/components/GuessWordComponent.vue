<template>
  <div class="flex flex-col items-center">
    <div class="flex">
      <div
        v-for="(char, index) in splittedWordToGuess"
        :key="index"
        class="border-solid border-2 border-blue-500 p-6 m-2"
      >
        <span v-if="props.selectedLetters.map((l) => l.toLowerCase()).includes(char.toLowerCase())">
          {{ char }}
        </span>
        <span v-else>_</span>
      </div>
    </div>

    <div v-if="isGuessed" class="mt-4 text-green-500 text-2xl font-bold">
      🎉 Congrats! You guessed the word! 🎉
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue'

const props = defineProps({
  selectedLetters: {
    type: Array,
    required: true,
  },
})

const wordToGuess = 'Leon'
const splittedWordToGuess = wordToGuess.split('')
const emit = defineEmits(['word-is-guessed'])

const isGuessed = computed(() => {
  let guess = splittedWordToGuess.every((char) =>
    props.selectedLetters.map((l) => l.toLowerCase()).includes(char.toLowerCase()),
  )
  if (guess) {
    emit('word-is-guessed', true)
  }
  return guess
})
</script>
