<template>
    <Disclosure v-slot="{ open }">
        <DisclosureButton
            data-uuid="3416a268-41a6-47e9-8d01-1be374bec514"
            :class="open ? class_open : class_closed">
            <h2 :class="title_class ?? `text-3xl font-medium text-slate-500`">{{ title }}</h2>
            <div v-if="loading">
                <font-awesome-icon icon="fa-light fa-spinner" size="2x" :spin-pulse="true" />
                <span class="hidden sr:inline">Loading...</span>
            </div>
            <font-awesome-icon icon="fa-solid fa-chevron-down" :rotation="open ? 180 : null" class="transition ease-in-out delay-250 text-gray-300 group-hover:text-gray-400"/>
        </DisclosureButton>
        <!-- Use the built-in `transition` component to add transitions. -->
        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <DisclosurePanel class="text-gray-500 mt-2">
                <slot/>
            </DisclosurePanel>
        </transition>
    </Disclosure>
</template>
<script>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue';

export default {
    components: {
        Disclosure, DisclosurePanel, DisclosureButton
    },
    props: {
        title:{
            required: true,
        },
        loading:{
            require: true
        },
        title_class:{
            required: false,
            default: null

        }
    },
    data(){
        // this.loading = false;

        return {
            class_closed: 'group w-full pt-2 flex items-center justify-between border-b-2 border-solid mb-2 transition ease-in-out delay-250 border-gray-200 hover:border-gray-400',
            class_open: 'group w-full pt-2 flex items-center justify-between'
        }
    }
}
</script>
