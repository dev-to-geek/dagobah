<template>
    <div class="w-full h-2 bg-slate-300 rounded-md">
        <div class="h-2 bg-blue-600 rounded-md
bg-gradient-to-r from-[#60A5FA] to-[#2563EB]"
             :style="'width:' + percentValue +'%'"></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    props: {
        max: {
            required: false,
            default: 100,
        },
        value: {
            required: true
        }
    },
    computed: {
        percentValue(){
            if (this.value > this.max) {
                return 100;
            }
            if (this.value < 0) {
                return 0;
            }
            return this.value / this.max * 100;
        }
    }
}
</script>

<style scoped>

</style>
