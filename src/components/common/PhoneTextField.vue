<script setup lang='ts'>
  import { reactive, computed, defineProps, defineEmits } from 'vue';
  import { Input } from '@/components/ui/input';
  
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    }
  });

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  // Reactive form object
  const form = reactive({
    phone_number: ''
  });

  // Computed property to add the +63 prefix automatically
  const phoneNumberWithPrefix = computed({
    get() {
      if (props.modelValue.startsWith('+63')) {
        return props.modelValue;
      }
      return '+63' + props.modelValue.replace(/^0/, '');
    },
    set(newValue) {
      emit('update:modelValue', newValue);
    }
  });
</script>
<template>
  <div>
    <Input 
      v-model="phoneNumberWithPrefix" 
      id="phonenumber" 
      class="col-span-3" 
      placeholder="+639123123123"
    />
  </div>
</template>
  
  