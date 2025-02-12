<template>
  <div v-show="isRunning" class="text-xl font-bold flex justify-center mt-10 mb-4">
    {{ formattedTime }}
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  isRunning: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['time-updated'])

const elapsedSeconds = ref(0)
const intervalId = ref(null)

function startClock() {
  if (!intervalId.value) {
    intervalId.value = setInterval(() => {
      elapsedSeconds.value++
      emit('time-updated', elapsedSeconds.value)
    }, 1000)
  }
}

function stopClock() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function resetClock() {
  stopClock()
  elapsedSeconds.value = 0
  if (props.isRunning) {
    startClock()
  }
}

const formattedTime = computed(() => {
  const minutes = String(Math.floor(elapsedSeconds.value / 60)).padStart(2, '0')
  const seconds = String(elapsedSeconds.value % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
})

watch(
  () => props.isRunning,
  (newVal) => {
    if (newVal) {
      startClock()
    } else {
      stopClock()
    }
  },
)

onBeforeUnmount(() => {
  stopClock()
})

defineExpose({
  resetClock,
})
</script>
