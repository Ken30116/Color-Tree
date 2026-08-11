<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="tw-flex tw-justify-end tw-px-[10px] md:tw-justify-center">
      <q-tabs
        v-model="tab"
        inline-label
        switch-indicator
        content-class="bg-primary text-secondary"
        active-class="active-tab"
        class="bg-lime text-dark shadow-2 tw-hidden md:tw-block">
        <q-route-tab name="home" icon="color_lens" label="色票查詢" class="tw-w-full" :to="'/'" />
        <q-route-tab name="analyze" icon="bar_chart" label="對比計算" :to="'/analyze'" />
        <q-route-tab name="simulation" icon="code" label="程式模擬" :to="'/simulation'" />
        <q-route-tab name="about" icon="info" label="關於版本" :to="'/about'" />
      </q-tabs>
      <HamburgerNav :tab="tab" />
    </q-header>
    <q-page-container class="tw-max-w-[1280px] tw-m-auto tw-px-[20px] md:tw-px-[50px]">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { setCssVar } from 'quasar';
import tinycolor from 'tinycolor2';
import HamburgerNav from '../components/HamburgerNav.vue';

const route = useRoute();
const tab = ref(route.path);
const id = route.params.id;
if (id) {
  const BgColor = tinycolor.mostReadable(id, ['#fff', '#000']).toHexString();
  const TextColor = tinycolor.mostReadable(BgColor, ['#fff', '#000']).toHexString();
  const body = document.querySelector('body');
  if (body) {
    body.style.backgroundColor = `#${id}`;
  }
  setCssVar('primary', BgColor);
  setCssVar('secondary', TextColor);
}
</script>
<style lang="scss">
$size: 30px;
$stroke: 4px;
@mixin icon($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: $secondary;
}
@mixin icon-before($height, $width, $top) {
  @include icon($height, $width);
  content: '';
  top: $top;
}
@mixin icon-after($height, $width, $top) {
  @include icon($height, $width);
  content: '';
  top: $top;
}
.active-tab .q-tab__label {
  font-weight: 700;
}
.q-tab__label {
  font-size: 20px;
  padding: 10px;
}
.menu-icon {
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 99;
  cursor: pointer;
  .icon {
    @include icon($stroke, $size);
    &:before {
      @include icon-before($stroke, $size, calc(-1 * $size / 3));
    }
    &:after {
      @include icon-before($stroke, $size, calc($size / 3));
    }
  }
}
.open {
  .icon:before {
    transform: rotateZ(-45deg) scaleX(0.75) translate(calc(-1 * $size / 3), -3px);
  }
  .icon:after {
    transform: rotateZ(45deg) scaleX(0.75) translate(calc(-1 * $size / 3), 3px);
  }
}
</style>
