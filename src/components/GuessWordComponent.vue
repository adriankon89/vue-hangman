<template>
  <div class="flex flex-col items-center">
    <div class="flex">
      <div
        v-for="(char, index) in splittedWordToGuess"
        :key="index"
        class="border-solid border-2 border-blue-500 p-6 m-2"
      >
        <span>
          {{
            props.selectedLetters.map((l) => l.toLowerCase()).includes(char.toLowerCase())
              ? char
              : '_'
          }}
        </span>
      </div>
    </div>

    <div v-if="isGuessed" class="mt-4 text-green-500 text-2xl font-bold">
      🎉 Congrats! You guessed the word! 🎉
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  selectedLetters: {
    type: Array,
    required: true,
  },
  wordToGuess: {
    type: String,
    required: true,
  },
})

const splittedWordToGuess = ref([])

watch(
  () => props.wordToGuess,
  (newWord) => {
    splittedWordToGuess.value = newWord.split('')
  },
  { immediate: true },
)

const isGuessed = computed(() => {
  if (props.wordToGuess) {
    const guess = splittedWordToGuess.value.every((char) =>
      props.selectedLetters.map((l) => l.toLowerCase()).includes(char.toLowerCase()),
    )
    return guess
  }
  return false
})
</script>
