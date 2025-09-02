<template>
  <div
    class="menu-icon tw-py-[30px] md:tw-hidden"
    :class="{ open: menuOpen }"
    @click="menuOpen = !menuOpen">
    <div class="icon"></div>
  </div>
  <q-tabs
    v-model="tab"
    inline-label
    content-class="bg-accent text-white tw-flex-col"
    active-class="active-tab tw-bg-[#666]"
    :style="`left: ${menuOpen ? 0 : '-100%'}`"
    class="tw-transition-all tw-duration-1000 bg-lime text-dark shadow-2 tw-absolute tw-top-full tw-w-full tw-h-[calc(100dvh-60px)] md:tw-hidden">
    <q-route-tab name="home" icon="color_lens" label="色票查詢" :to="'/'" />
    <q-route-tab name="analyze" icon="bar_chart" label="對比計算" :to="'/analyze'" />
    <q-route-tab name="simulation" icon="code" label="程式模擬" :to="'/simulation'" />
    <q-route-tab name="about" icon="info" label="關於版本" :to="'/about'" />
  </q-tabs>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const menuOpen = ref(false);
const tab = ref(route.path);
</script>
