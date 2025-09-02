<template>
  <q-page class="tw-py-[25px] md:tw-py-[50px]">
    <article
      class="tw-w-full tw-h-[250px] tw-flex tw-flex-col tw-items-center tw-border tw-p-[30px] tw-mt-[30px] tw-rounded tw-shadow-xl">
      <q-btn-toggle
        v-model="model"
        push
        glossy
        toggle-color="primary"
        color="secondary"
        text-color="primary"
        class="tw-mb-[30px] tw-mt-[-50px]"
        :options="[
          { label: '主題', value: 'label', slot: 'label' },
          { label: '名稱', value: 'name', slot: 'name' },
          { label: 'HEX', value: 'hex', slot: 'hex' },
          { label: 'RGB', value: 'rgb', slot: 'rgb' },
          { label: 'CMYK', value: 'CMYK', slot: 'CMYK' },
        ]">
      </q-btn-toggle>
      <q-form
        v-if="model === 'label'"
        @submit="onLabelSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <div class="tw-m-0 tw-flex tw-flex-col tw-items-end">
          <q-toggle
            v-model="isLabelAll"
            checked-icon="check"
            color="primary"
            label="所有主題皆符合"
            unchecked-icon="clear" />
          <q-select
            name="label"
            v-model="labelType"
            multiple
            :options="labelOptions"
            color="primary"
            filled
            clearable
            class="tw-w-full"
            label="主題" />
        </div>

        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-m-0" />
      </q-form>
      <q-form
        v-if="model === 'name'"
        @submit="onNameSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <q-input v-model="nameSearch" filled label="查詢" class="tw-m-0">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-m-0" />
      </q-form>
      <q-form
        v-if="model === 'hex'"
        @submit="onHexSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <q-input v-model="hexText" filled label="hex" class="tw-w-full tw-m-0" prefix="#" />
        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-m-0" />
      </q-form>
      <q-form
        v-if="model === 'rgb'"
        @submit="onRgbSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <div class="tw-w-full tw-flex tw-space-x-[10px] tw-m-0">
          <q-input v-model="RText" filled label="R" class="tw-flex-1" />
          <q-input v-model="GText" filled label="G" class="tw-flex-1" />
          <q-input v-model="BText" filled label="B" class="tw-flex-1" />
        </div>
        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-m-0" />
      </q-form>
      <q-form
        v-if="model === 'CMYK'"
        @submit="onCMYKSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <div class="tw-w-full tw-flex tw-space-x-[10px] tw-m-0">
          <q-input v-model="CText" filled label="C" class="tw-flex-1" suffix="%" />
          <q-input v-model="MText" filled label="M" class="tw-flex-1" suffix="%" />
          <q-input v-model="YText" filled label="Y" class="tw-flex-1" suffix="%" />
          <q-input v-model="KText" filled label="K" class="tw-flex-1" suffix="%" />
        </div>
        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-m-0" />
      </q-form>
    </article>
    <section>
      <article v-if="isLoading" class="tw-flex tw-justify-center tw-py-[200px]">
        <q-spinner-grid color="primary" size="10%" />
      </article>
      <article v-else>
        <div class="tw-my-[50px] tw-grid tw-grid-cols-3 tw-grid-flow-row tw-gap-4">
          <q-intersection v-for="item in lists" :key="item.hex" transition="flip-down">
            <q-card class="tw-h-full tw-flex tw-p-[15px]">
              <div class="tw-h-full tw-flex tw-items-center">
                <div
                  class="tw-w-[50px] tw-h-[50px]"
                  :style="`background-color:${item.hex};border-radius:50%`"></div>
              </div>

              <q-card-section class="tw-py-0">
                <h2>
                  {{ item.name
                  }}<span v-if="item.webName" class="tw-text-[18px]"> ({{ item.webName }})</span>
                </h2>
                <div v-if="item.label" class="tw-space-x-[8px] tw-mb-[8px]">
                  <span
                    v-for="label in getLabel(item.label)"
                    :key="label"
                    class="tw-text-[12px] text-secondary bg-primary tw-px-[10px] tw-py-[2px] tw-rounded-full">
                    {{ label }}
                  </span>
                </div>
                <p><b>HEX:</b> {{ item.hex }}</p>
                <p><b>RGB:</b> {{ item.rgb }}</p>
                <p><b>CMYK:</b> {{ item.cmyk }}</p>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
        <div class="q-pa-lg flex flex-center">
          <q-pagination v-model="current" :max="page" input @click="pagination()" />
        </div>
      </article>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import API from '../api';
import { ref, onMounted } from 'vue';
const isDefaultSearch = ref(true);
const lists = ref();
const model = ref('label');
const labelType = ref([]);
const isLabelAll = ref(false);
const nameSearch = ref('');
const hexText = ref('');
const RText = ref('');
const GText = ref('');
const BText = ref('');
const CText = ref('');
const YText = ref('');
const MText = ref('');
const KText = ref('');
const current = ref(1);
const page = ref(0);
const isLoading = ref(false);
const maxList = 30;
const resultData = ref();
const labelOptions = [
  {
    label: '景觀設計',
  },
  {
    label: '建築設計',
  },
  {
    label: '網頁設計',
  },
  {
    label: '視覺藝術',
  },
  {
    label: '科技系列',
  },
  {
    label: '海洋系列',
  },
];
const init = async () => {
  try {
    isLoading.value = true;
    const total = (await API.postDataTotal()).data.total;
    const res = await API.postDataInRange(
      (current.value - 1) * maxList + 1,
      current.value * maxList
    );
    lists.value = res.data;
    page.value = Math.ceil(total / maxList);
    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
};
const getPageSearch = () => {
  lists.value = resultData.value.slice((current.value - 1) * maxList, current.value * maxList);
  const total = resultData.value.length;
  page.value = Math.ceil(total / maxList);
  isLoading.value = false;
};
const onLabelSubmit = async () => {
  try {
    isLoading.value = true;
    const res = await API.postLabelData(isLabelAll.value, labelType.value);
    resultData.value = res.data;
    isDefaultSearch.value = false;
    getPageSearch();
  } catch (err) {
    console.log(err);
  }
};
const onNameSubmit = async () => {
  try {
    isLoading.value = true;
    const res = await API.postNameData(nameSearch.value);
    resultData.value = res.data;
    isDefaultSearch.value = false;
    getPageSearch();
  } catch (err) {
    console.log(err);
  }
};
const onHexSubmit = async () => {
  try {
    isLoading.value = true;
    const res = await API.postHexData(`#${hexText.value}`);
    resultData.value = res.data;
    isDefaultSearch.value = false;
    getPageSearch();
  } catch (err) {
    console.log(err);
  }
};
const onRgbSubmit = async () => {
  try {
    isLoading.value = true;
    const rgb = `${RText.value},${GText.value},${BText.value}`;
    const res = await API.postRgbData(rgb);
    resultData.value = res.data;
    isDefaultSearch.value = false;
    getPageSearch();
  } catch (err) {
    console.log(err);
  }
};
const onCMYKSubmit = async () => {
  try {
    isLoading.value = true;
    const CMYK = `${CText.value},${MText.value},${YText.value},${KText.value}`;
    const res = await API.postCMYKData(CMYK);
    resultData.value = res.data;
    isDefaultSearch.value = false;
    getPageSearch();
  } catch (err) {
    console.log(err);
  }
};
const getLabel = (value: string) => {
  const labels = value.split(',');
  return labels.length === 1 ? '' : labels;
};
const pagination = () => {
  if (isDefaultSearch.value) {
    init();
  } else {
    getPageSearch();
  }
};
onMounted(() => {
  init();
});
</script>
