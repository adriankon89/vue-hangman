<template>
  <div class="flex flex-col items-center">
    <div v-if="wordToGuess" class="mb-4 text-gray-700 text-lg">
      <p>
        Category: <span class="font-bold">{{ props.category }}</span> Miss shots:
        <span class="font-bold">{{ missShots }}</span>
      </p>
      <p>
        Difficulty: <span class="font-bold">{{ props.difficulty }}</span> Hit shots:
        <span class="font-bold">{{ hitShots }}</span>
      </p>
    </div>

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
  category: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['word-is-guessed'])

const splittedWordToGuess = ref([])
const missShots = ref(0)
const hitShots = ref(0)

watch(
  () => props.wordToGuess,
  (newWord) => {
    splittedWordToGuess.value = newWord.split('')
  },
  { immediate: true },
)

watch(
  () => props.selectedLetters,
  (newSelectedLetters) => {
    if (props.wordToGuess) {
      const wordChars = splittedWordToGuess.value.map((char) => char.toLowerCase())

      const missedCount = newSelectedLetters.filter(
        (letter) => !wordChars.includes(letter.toLowerCase()),
      ).length
      missShots.value = missedCount

      const hitCount = newSelectedLetters.filter((letter) =>
        wordChars.includes(letter.toLowerCase()),
      ).length
      hitShots.value = hitCount
    }
  },
  { deep: true },
)

const isGuessed = computed(() => {
  if (props.wordToGuess) {
    const guess = splittedWordToGuess.value.every((char) =>
      props.selectedLetters.map((l) => l.toLowerCase()).includes(char.toLowerCase()),
    )
    if (guess) {
      emit('word-is-guessed', props.wordToGuess)
    }
    return guess
  }
  return false
})
</script>
