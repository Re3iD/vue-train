<template>
  <input :value="modelValue"
   class="input"
   @input="updateInput"
    type="text"/>
</template>

<script>
export default {
    name: 'my-input',
    props:{
      modelValue:[String,Number]
    },
    methods:{
      updateInput(event){
        this.$emit('update:modelValue',event.target.value)
      }
    }
}
</script>

<style>
.input{
    border:2px solid teal;
    padding: 10px 15px;
    width: 100%;
    margin-top: 10px;
}
</style>