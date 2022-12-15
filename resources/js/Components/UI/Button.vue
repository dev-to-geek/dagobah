<template>
    <button type="button" :class="[isDisabled ? 'bg-slate-300 text-gray-200' : '', this.class, 'flex gap-2 items-center']" @click="click_event"
            :disabled="isDisabled">
        <div v-if="is_loading || showLoading"><SpinnerComponent /></div>
        <slot />
    </button>
</template>
<script>
import SpinnerComponent from "./SpinnerComponent.vue";
export default {
    name: "Button",
    components: {
        SpinnerComponent
    },
    props: [
        'class',
        'is_loading',
        'loading',
        'disabled'
    ],
    emits: ['click'],
    data(){
        return {
            showLoading: this.is_loading
        }
    },
    methods:{
        click_event(){
            if(this.disabled === true){
                return false;
            }
            if(this.loading === true){
                this.showLoading = true;
                let $button = this;
                setTimeout(function (){
                    $button.showLoading = false;
                },500);
            }
            this.$emit('click');
        }
    },
    computed: {
        isDisabled(){
            return this.is_loading || this.showLoading || this.disabled === true;
        }
    }
}
</script>

<style scoped>

</style>
