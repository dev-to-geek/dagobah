<template>
    <Listbox as="div" v-model="selected" data-uuid="a1b097a2-4063-4333-a13d-918026918583" >
        <ListboxLabel v-if="label !== ''" class="block text-base font-medium text-gray-700">{{  label }}</ListboxLabel>
        <div class="relative mt-1">
            <ListboxButton class="relative w-full cursor-default  border border-slate-300 bg-white py-4 pl-3 pr-10 text-left shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:text-base">
                <span class="block truncate">{{ selected.name }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
                    <ListboxOption as="template" v-for="protocol in protocols" :key="protocol.id" :value="protocol" v-slot="{ active, selected }">
                        <li :class="[active ? 'text-white bg-slate-500' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ protocol.name }}</span>

                            <span v-if="selected" :class="[active ? 'text-white' : 'text-slate-500', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script>
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';

export default {
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
        ChevronUpDownIcon
    },
    data() {
        let protocols = [
            {name: 'TCP', value: 'tcp'},
            {name: 'UDP', value: 'udp'},
            {name: 'ICMP', value: 'icmp'}
        ];
        let selected = protocols[0];


        return {
            selected,
            protocols
        };
    },
    computed: {
    },
    props: {
        label: {
            required:false,
            default: ''
        }
    },
    methods: {

    },
}

</script>
