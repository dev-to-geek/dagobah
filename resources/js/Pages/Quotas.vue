<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import FirewallComponent from "../Components/Firewall/FirewallComponent.vue";
import ProjectDetails from "@/Components/ProjectDetails.vue";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />
    <main class="h-full pt-20">
        <div :class="['py-4 h-full']">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 h-full">
                <ProjectDetails/>
            </div>
        </div>
    </main>

</template>
