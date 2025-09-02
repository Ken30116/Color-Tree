<template>
  <div
    ref="canv"
    class="canv tw-w-[75px] tw-h-[75px] tw-absolute tw-top-1/2 tw-translate-y-[-50%] tw-origin-bottom"
    style="--n: 36; --f: 11.430052302761343">
    <div class="drop" style="--k: 0; --s: 0.76"></div>
    <div class="drop" style="--k: 1; --s: 0.61"></div>
    <div class="drop" style="--k: 2; --s: 1.02"></div>
    <div class="drop" style="--k: 3; --s: 0.48"></div>
    <div class="drop" style="--k: 4; --s: 0.5"></div>
    <div class="drop" style="--k: 5; --s: 0.87"></div>
    <div class="drop" style="--k: 6; --s: 0.4"></div>
    <div class="drop" style="--k: 7; --s: 1"></div>
    <div class="drop" style="--k: 8; --s: 0.44"></div>
    <div class="drop" style="--k: 9; --s: 0.67"></div>
    <div class="drop" style="--k: 10; --s: 0.76"></div>
    <div class="drop" style="--k: 11; --s: 0.41"></div>
    <div class="drop" style="--k: 12; --s: 0.66"></div>
    <div class="drop" style="--k: 13; --s: 0.43"></div>
    <div class="drop" style="--k: 14; --s: 0.68"></div>
    <div class="drop" style="--k: 15; --s: 1.05"></div>
    <div class="drop" style="--k: 16; --s: 1.06"></div>
    <div class="drop" style="--k: 17; --s: 0.78"></div>
    <div class="drop" style="--k: 18; --s: 0.92"></div>
    <div class="drop" style="--k: 19; --s: 0.61"></div>
    <div class="drop" style="--k: 20; --s: 0.61"></div>
    <div class="drop" style="--k: 21; --s: 0.39"></div>
    <div class="drop" style="--k: 22; --s: 1.09"></div>
    <div class="drop" style="--k: 23; --s: 0.65"></div>
    <div class="drop" style="--k: 24; --s: 0.8"></div>
    <div class="drop" style="--k: 25; --s: 0.92"></div>
    <div class="drop" style="--k: 26; --s: 0.88"></div>
    <div class="drop" style="--k: 27; --s: 0.97"></div>
    <div class="drop" style="--k: 28; --s: 1.03"></div>
    <div class="drop" style="--k: 29; --s: 0.66"></div>
    <div class="drop" style="--k: 30; --s: 0.85"></div>
    <div class="drop" style="--k: 31; --s: 1.05"></div>
    <div class="drop" style="--k: 32; --s: 0.53"></div>
    <div class="drop" style="--k: 33; --s: 0.72"></div>
    <div class="drop" style="--k: 34; --s: 0.5"></div>
    <div class="drop" style="--k: 35; --s: 0.94"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const canv = ref<HTMLElement | null>(null);
const someMethod = (value: string) => {
  canv.value?.style.setProperty('--color', value);
};
defineExpose({
  someMethod,
});
</script>
<style lang="scss" scoped>
@keyframes wave {
  0%,
  32% {
    transform: rotate(-45deg) translatey(calc(var(--s) * 1em)) scale(1);
  }
  35% {
    transform: rotate(calc(var(--adrop) - 45deg)) translate(0) scale(1);
  }
}

.canv {
  --rdist: calc(1em * var(--f));
  --p3d: perspective(20em);
  filter: contrast(19);
  transform: rotateX(85deg);
}

.drop {
  --rdrop: calc(var(--s) * 1em);
  --adrop: var(--k) * 1turn / var(--n);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: calc(-1 * var(--rdrop));
  padding: var(--rdrop);
  border-radius: 50%;
  transform: rotate(calc(var(--adrop) - 45deg)) translate(var(--rdist))
    scale(0, calc(var(--s) * 0.5));
  background-color: var(--color);
  filter: blur(5px);
  animation: wave 2s ease-out infinite;
}
</style>
