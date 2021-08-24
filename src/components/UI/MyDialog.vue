<template>
 <div class="dialog" v-if="show" @click.stop="hideDialog">
     <div @click.stop class="dialog__content">
         <slot></slot>
     </div>
 </div>
</template>

<script>
import toggleMixIn from "../mixin/toggleMixIn"
export default {
    name: 'my-dialog',
    mixins: [toggleMixIn]
}
</script>

<style scoped>
.dialog{
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0,0,0.5);
    position: fixed;
    display: flex;
}
.dialog__content{
    padding: 20px;
    margin: auto;
    background: white;
    min-height: 50px;
    min-width: 300px;
    border-radius: 12px;
}
</style>
