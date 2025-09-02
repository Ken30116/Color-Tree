<template>
  <q-page class="tw-py-[25px] md:tw-py-[50px] tw-overflow-hidden">
    <article
      class="tw-w-full tw-h-[250px] tw-flex tw-justify-center tw-items-center tw-border tw-p-[30px] tw-mt-[30px] tw-rounded tw-shadow-xl">
      <q-form class="q-gutter-md tw-flex tw-space-x-[50px]">
        <div class="tw-flex tw-items-center tw-space-x-[30px]">
          <h3>參賽選手:</h3>
          <div class="tw-flex-1 tw-space-y-[30px]">
            <q-input
              v-model="hex1Text"
              filled
              label="hex"
              :disable="!isStart1"
              prefix="#"
              maxlength="6" />
            <q-btn
              v-if="isStart1"
              label="開始"
              color="primary"
              class="tw-w-full"
              @click="Start('1')" />
            <q-btn v-else label="清除" color="accent" class="tw-w-full" @click="Clean('1')" />
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-space-x-[30px]">
          <h3>殘酷對手:</h3>
          <div class="tw-flex-1 tw-space-y-[30px]">
            <q-input
              v-model="hex2Text"
              filled
              label="hex"
              :disable="!isStart2"
              prefix="#"
              maxlength="6" />
            <q-btn
              v-if="isStart2"
              label="開始"
              color="primary"
              class="tw-w-full"
              @click="Start('2')" />
            <q-btn v-else label="清除" color="accent" class="tw-w-full" @click="Clean('2')" />
          </div>
        </div>
      </q-form>
    </article>
    <section class="tw-w-full tw-h-[600px] tw-relative">
      <article
        class="bg-primary result-content tw-w-[300px] tw-h-[130px] tw-absolute tw-top-8 tw-left-1/2"
        :class="{ 'zoom-in': isResult }">
        <div class="tw-px-[50px] tw-py-[15px]">
          <h3 class="text-secondary">
            對比度:
            <span ref="countup"></span>
          </h3>
          <h3 class="text-secondary tw-text-center">
            {{ contrastResult ? contrastResult.level : '-' }}
          </h3>
        </div>
      </article>
      <CanvElement
        v-show="!isStart1"
        ref="canv1"
        class="tw-left-[20.3%]"
        :class="{ 'tw-hidden': isResult }" />
      <CanvElement
        v-show="!isStart2"
        ref="canv2"
        class="tw-right-[21.5%]"
        :class="{ 'tw-hidden': isResult }" />
      <div
        class="ball tw-w-[100px] tw-h-[100px] tw-rounded-full tw-absolute tw-top-1/2 tw-left-[20%] tw-translate-y-[-50%] tw-z-10"
        :class="{ start: !isStart1 && !isResult, 'fade-in-left': isResult }"
        :style="`background-color: #${hex1Text};`"></div>
      <div
        class="ball tw-w-[100px] tw-h-[100px] tw-rounded-full tw-absolute tw-top-1/2 tw-right-[20%] tw-translate-y-[-50%] tw-z-10"
        :class="{ start: !isStart2 && !isResult, 'fade-in-right': isResult }"
        :style="`background-color: #${hex2Text};`"></div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CountUp } from 'countup.js';
import CanvElement from '../components/CanvElement.vue';
import tinycolor from 'tinycolor2';

interface CanvElementMethods {
  someMethod: (color: string) => void;
}

const countup = ref<HTMLElement | null>(null);
const hex1Text = ref('');
const hex2Text = ref('');
const isStart1 = ref(true);
const isStart2 = ref(true);
const isResult = ref(false);
const canv1 = ref<(InstanceType<typeof CanvElement> & CanvElementMethods) | null>(null);
const canv2 = ref<(InstanceType<typeof CanvElement> & CanvElementMethods) | null>(null);
const contrastResult = ref<{ value: number; level: string } | null>(null);
let countUpInstance: CountUp | null = null;

const init = () => {
  if (countup.value) {
    countUpInstance = new CountUp(countup.value, 0, {
      duration: 2,
    });
    if (!countUpInstance.error) {
      countUpInstance.start();
    } else {
      console.error(countUpInstance.error);
    }
  }
};

const getContrastLevel = (value: number): string => {
  if (value >= 7) return '極好';
  if (value >= 4.5) return '好';
  if (value >= 3) return '尚可';
  if (value >= 1.5) return '差';
  return '極差';
};

const Play = () => {
  const contrastValue = tinycolor.readability(hex1Text.value, hex2Text.value);
  if (contrastValue) {
    isResult.value = true;
    contrastResult.value = {
      value: contrastValue,
      level: getContrastLevel(contrastValue),
    };
    if (countup.value) {
      countUpInstance = new CountUp(countup.value, contrastValue, {
        startVal: 0,
        duration: 2,
        decimalPlaces: 2,
      });
      if (!countUpInstance.error) {
        countUpInstance.start();
      } else {
        console.error(countUpInstance.error);
      }
    }
  }
};

const Start = (value: string) => {
  if (value === '1') {
    isStart1.value = false;
    canv1.value?.someMethod(`#${hex1Text.value}`);
  } else {
    isStart2.value = false;
    canv2.value?.someMethod(`#${hex2Text.value}`);
  }
  if (!isStart1.value && !isStart2.value) {
    Play();
  }
};

const Clean = (value: string) => {
  isResult.value = false;
  if (value === '1') {
    isStart1.value = true;
    hex1Text.value = '';
  } else {
    isStart2.value = true;
    hex2Text.value = '';
  }
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
@keyframes zoomIn {
  0% {
    transform: translateY(-50%) scale(1);
  }
  100% {
    transform: translateY(-50%) scale(1.5);
  }
}
@keyframes up {
  0% {
    transform: translateY(-50%) scale(1.5);
  }
  50% {
    transform: translateY(-60%) scale(1.5);
  }
  100% {
    transform: translateY(-50%) scale(1.5);
  }
}
@keyframes fade-in-left {
  0% {
    left: 20%;
  }
  50% {
    left: 15%;
  }
  100% {
    left: 41.5%;
  }
}
@keyframes fade-in-right {
  0% {
    right: 20%;
  }
  50% {
    right: 15%;
  }
  100% {
    right: 41.5%;
  }
}
.ball.start {
  animation: zoomIn 1s forwards, up 2s 1.8s infinite;
}
.ball {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3), inset 0 -10px 15px rgba(0, 0, 0, 0.2),
    inset 0 10px 15px rgba(255, 255, 255, 0.3);
}
.result-content {
  box-shadow: inset 0 0 30px rgba(255, 255, 255, 1);
  transform: translateX(-50%) scale(0);
  transition: all 0.5s 1s;
}
.zoom-in {
  transform: translateX(-50%) scale(1);
}
.fade-in-left {
  animation: fade-in-left 1s forwards;
}
.fade-in-right {
  animation: fade-in-right 1s forwards;
}
</style>
