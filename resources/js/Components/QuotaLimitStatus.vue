<template>
    <div :class="['quota-box rounded-lg border-2 flex-none shrink-0 w-full py-4 px-6',
    'bg-none md:bg-no-repeat md:bg-right-center md:bg-50% bg-origin-content', imageBg ]">
        <h3 class="flex justify-between text-xl font-semibold mb-2 md:mb-20 mt-2">
            <span class="w-1/2 md:w-full whitespace-nowrap overflow-ellipsis">{{ label }}</span>
            <span><font-awesome-icon icon="fa-solid fa-circle" :class="[colorStatus, 'text-sm']"/></span>
        </h3>
        <div class="break-keep whitespace-nowrap
                    flex flex-no-wrap content-center items-center
                    mb-2">
            <span class="font-semibold text-2xl md:text-6xl
            text-transparent bg-clip-text
            bg-gradient-to-t from-[#3B82F6] via-[#64748B] to-[#64748B] ">
                {{ value }}</span>
            <span class="text-slate-500 text-xl md:text-4xl -py">/</span>
            <span class="text-slate-500 text-xl md:text-2xl pt-0 md:pt-6">{{ max }}&nbsp;{{ unit }}</span>
        </div>
        <div class="progress-container mb-2">
            <ProgressBar :value="value" :max="max"/>
        </div>
    </div>
</template>

<script>
import ProgressBar from "./ProgressBar.vue";

export default {
    name: "QuotaLimitStatus",
    components: {
        ProgressBar
    },
    props: {
        label: {
            required: true,
            type: String
        },
        max: {
            required: true,
        },
        unit: {
            required: false,
            default: ''
        },
        value: {
            required: false,
            default: 0
        },
        imageClass: {
            required: false,
            default: null
        }
    },
    computed: {
        percentValue() {
            if (this.value > this.max) {
                return 100;
            }
            if (this.value < 0) {
                return 0;
            }
            return this.value / this.max * 100;
        },
        colorStatus() {
            if (this.percentValue < 60) {
                return 'text-green-500';
            } else if (this.percentValue < 80) {
                return 'text-yellow-400';
            } else {
                return 'text-red-500';
            }
        },
        imageBg() {
            switch (this.imageClass) {
                case 'instance':
                    return 'md:bg-quota-instance';
                case 'cpu':
                    return 'md:bg-quota-cpu';
                case 'ram':
                    return 'md:bg-quota-ram';
                case 'backup':
                    return 'md:bg-quota-backup';
                case 'volume':
                    return 'md:bg-quota-volume';
                case 'floatingIp':
                    return 'md:bg-quota-floatingIp';
                default:
                    return '';
            }
        }

    }
}
</script>

<style scoped>

</style>
