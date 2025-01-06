<template>
  <div class="h-12">
    <span
      v-for="letter in letters"
      :key="letter"
      class="p-6 ml-2 text-white"
      :class="[getLetterClass(letter), { 'pointer-events-none select-none': props.isWordGuessed }]"
      @click="handleClick(letter)"
    >
      {{ letter }}
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isWordGuessed: {
    type: Boolean,
    required: true,
  },
})

const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const clickedLetters = ref([])

const emit = defineEmits(['letter-clicked'])

function handleClick(letter) {
  if (!clickedLetters.value.includes(letter)) {
    clickedLetters.value.push(letter)
    emit('letter-clicked', letter)
  }
}

function getLetterClass(letter) {
  return {
    'bg-gray-500 cursor-not-allowed': clickedLetters.value.includes(letter),
    'bg-blue-500 cursor-pointer': !clickedLetters.value.includes(letter),
  }
}
</script>
