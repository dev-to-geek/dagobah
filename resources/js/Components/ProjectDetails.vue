<template>

    <div id="project-dashboard">
        <DisclosureComponent :title="'TITLE'" :loading="false">
            <div class="mb-8">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <QuotaLimitStatus
                        :label="'general.instances'"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        image-class="instance"
                    />
                    <QuotaLimitStatus
                        label="CPU"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        image-class="cpu"
                    />
                    <QuotaLimitStatus
                        label="RAM"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        unit="GB"
                        image-class="ram"
                    />
                    <QuotaLimitStatus
                        :label="'project_quotas.volumes'"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        image-class="backup"
                    />
                    <QuotaLimitStatus
                        :label="'project_quotas.volume'"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        unit="GB"
                        image-class="volume"
                    />
                    <QuotaLimitStatus
                        label="Floating IP"
                        :value="Math.floor(Math.random() * 10)"
                        max="10"
                        image-class="floatingIp"
                    />
                </div>
            </div>
        </DisclosureComponent>
    </div>
</template>

<script setup>
import DisclosureComponent from "./DisclosureComponent.vue";
import QuotaLimitStatus from "@/Components/QuotaLimitStatus.vue";

</script>

<style scoped>

</style>
