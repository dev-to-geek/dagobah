<script setup>
import { Head, Link } from '@inertiajs/inertia-vue3';
import FirewallComponent from "../Components/Firewall/FirewallComponent.vue";

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});
</script>

<template>
    <Head title="Welcome" />

    <FirewallComponent
    />


</template>
