<template>
  <div class="flex flex-col items-center">
    <!-- Display category and difficulty -->
    <div class="mb-4 text-gray-700 text-lg">
      <p>
        Category: <span class="font-bold">{{ props.category }}</span>
      </p>
      <p>
        Difficulty: <span class="font-bold">{{ props.difficulty }}</span>
      </p>
    </div>

    <!-- Display the word to guess -->
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

    <!-- Congratulatory message -->
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
    if (guess) {
      emit('word-is-guessed', props.wordToGuess)
    }
    return guess
  }
  return false
})
</script>
