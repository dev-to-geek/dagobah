<template>
    <div :class="['', this.class]">
        <span>questo è un spinner</span>
        <span class="hidden sr:block">Loading...</span>
    </div>
</template>
<script>
export default {
    props: {
        class: {
            required: false,
            default: ''
        },
        iconSize: {
            required: false,
            default: '2x'
        }
    }
}
</script>
