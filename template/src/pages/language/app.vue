<template>
  <div class="flex">
    hello world
  </div>
</template>
{{#if ts}}
<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
export default defineComponent({
  setup () {
    const { locale } = useI18n();
    const setLangCodition = (val:string) => {
      locale.value = val;
      localStorage.setItem('language', locale.value);
    };
    return {
      setLangCodition
    };
  }
});
</script>
{{else}}
<script>
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';
export default defineComponent({
  setup () {
    const { locale } = useI18n();
    const setLangCodition = (val) => {
      locale.value = val;
      localStorage.setItem('language', locale.value);
    };
    return {
      setLangCodition
    };
  }
});
</script>
{{/if}}