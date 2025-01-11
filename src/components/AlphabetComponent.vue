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
import { defineEmits } from 'vue'

const props = defineProps({
  isWordGuessed: {
    type: Boolean,
    required: true,
  },
  clickedLetters: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['letter-clicked', 'update:clickedLetters'])

const letters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

function handleClick(letter) {
  if (!props.clickedLetters.includes(letter)) {
    emit('update:clickedLetters', [...props.clickedLetters, letter])
    emit('letter-clicked', letter)
  }
}

function getLetterClass(letter) {
  return {
    'bg-gray-500 cursor-not-allowed': props.clickedLetters.includes(letter),
    'bg-blue-500 cursor-pointer': !props.clickedLetters.includes(letter),
  }
}
</script>
