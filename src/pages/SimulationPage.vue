<template>
  <q-page class="tw-py-[25px] md:tw-py-[50px]">
    <article
      class="tw-w-full tw-flex tw-flex-col tw-items-center tw-border tw-p-[30px] tw-mt-[30px] tw-rounded tw-shadow-xl">
      <q-btn-toggle
        v-model="model"
        push
        glossy
        toggle-color="primary"
        color="secondary"
        text-color="primary"
        class="tw-mb-[30px] tw-mt-[-50px]"
        :options="[
          { label: '文字邊框', value: 'textBorder', slot: 'textBorder' },
          { label: '區塊漸層外框', value: 'divBorder', slot: 'divBorder' },
        ]">
      </q-btn-toggle>
      <q-form
        v-if="model === 'textBorder'"
        @submit="onTextBorderSubmit"
        class="q-gutter-md tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-between tw-m-0">
        <div class="tw-m-0 tw-flex tw-flex-col tw-items-end">
          <q-toggle
            v-model="isTextGradient"
            checked-icon="check"
            color="primary"
            label="漸層"
            unchecked-icon="clear" />
          <q-input v-model="textBorderName" filled label="模擬文字" class="tw-w-full" />
          <div class="tw-flex tw-w-full tw-justify-center tw-space-x-[30px] tw-mt-[30px]">
            <div class="tw-w-1/3 tw-max-w-[250px]">
              <div>文字顏色</div>
              <q-color v-model="textBorderTextColor" class="tw-w-full" />
            </div>
            <div v-if="isTextGradient" class="tw-w-2/3 tw-max-w-[530px]">
              <div>字邊框顏色</div>
              <div class="tw-w-full tw-flex tw-space-x-[30px]">
                <div class="tw-w-1/2 tw-max-w-[250px]">
                  <q-color v-model="textBorderTextGradientColor" class="tw-w-full" />
                </div>
                <div class="tw-w-1/2 tw-max-w-[250px] tw-flex tw-flex-col tw-space-y-[10px]">
                  <div class="tw-flex tw-w-full">
                    <q-radio v-model="textBorderTextGradientDirection" val="top" label="⬆" />
                    <q-radio v-model="textBorderTextGradientDirection" val="right" label="⮕" />
                    <q-radio v-model="textBorderTextGradientDirection" val="bottom" label="⬇" />
                    <q-radio v-model="textBorderTextGradientDirection" val="left" label="⬅" />
                  </div>
                  <div class="tw-flex tw-space-x-[10px] tw-items-center">
                    <q-input
                      v-model="textBorderTextGradientRatio"
                      filled
                      label="%"
                      suffix="%"
                      class="tw-flex-1" />
                    <q-btn
                      icon="add"
                      type="button"
                      color="primary"
                      class="tw-w-[50px] tw-h-[50px]"
                      @click="addGradient1" />
                  </div>
                  <div
                    class="tw-flex-1 tw-p-[15px] tw-border tw-rounded-[5px] tw-space-y-[10px] tw-overflow-y-scroll">
                    <div
                      v-for="(item, i) in gradient1"
                      :key="i"
                      class="tw-flex tw-justify-between tw-items-center">
                      <div
                        :style="`background-color:#${item.split('#')[1]};color:${tinycolor
                          .mostReadable(item.split('#')[1], ['#fff', '#000'])
                          .toHexString()}`"
                        class="tw-p-[5px] tw-rounded-[5px]">
                        {{ item }}
                      </div>
                      <q-btn
                        icon="delete"
                        type="button"
                        round
                        color="primary"
                        class="tw-w-[20px] tw-h-[20px]"
                        @click="removeGradient1(item)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="tw-w-1/3 tw-max-w-[250px]">
              <div>字邊框顏色</div>
              <q-color v-model="textBorderTextBorderColor" class="tw-w-full" />
            </div>
          </div>
        </div>
        <q-btn label="Submit" type="submit" color="primary" class="tw-w-full tw-mt-[30px]" />
      </q-form>
    </article>
    <article>
      <v-ace-editor
        v-model:value="htmlContent"
        lang="html"
        theme="chrome"
        readonly
        wrap
        style="height: 300px" />
    </article>
  </q-page>
</template>

<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { ref, onMounted } from 'vue';
import { VAceEditor } from 'vue3-ace-editor';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
const model = ref('textBorder');
const isTextGradient = ref(false);
const textBorderName = ref('');
const htmlContent = ref('');
const textBorderTextColor = ref('#ffffff');
const textBorderTextBorderColor = ref('#ffffff');
const textBorderTextGradientColor = ref('#ffffff');
const textBorderTextGradientDirection = ref('top');
const textBorderTextGradientRatio = ref(0);
const gradient1 = ref<string[]>([]);
const init = () => {
  console.log(123);
};
const addGradient1 = () => {
  gradient1.value.push(
    `${textBorderTextGradientRatio.value}% ${textBorderTextGradientColor.value}`
  );
};
const removeGradient1 = (value: string) => {
  gradient1.value = gradient1.value.filter((element) => element !== value);
};
const onTextBorderSubmit = () => {
  htmlContent.value = `<div class="gradient-border-text" data-text="${textBorderName.value}">${textBorderName.value}</div>`;
};
onMounted(() => {
  init();
});
</script>
