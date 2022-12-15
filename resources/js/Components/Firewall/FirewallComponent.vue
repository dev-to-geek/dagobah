<template>
    <div class="app-container mx-32">


        <h2>FIREWALL</h2>
        <div class="caption">
            <p>caption</p>
        </div>

        <table class="list" data-uuid="10288039-c3cc-4332-892d-a3b748ec2472">
            <thead>
            <tr>
                <th scope="col">protocol</th>
                <th scope="col">port range</th>
                <th scope="col">source ips</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rule in ingress_ipv4_rules">
                <td class="uppercase tracking-wide">
                    {{ rule.protocol ?? 'ANY' }}
                </td>
                <td>
                    <div v-if="rule.protocol?.toUpperCase() !== 'ICMP'" class="break-keep whitespace-nowrap">
                        {{ rule.port_range_min ?? 1 }}-{{ rule.port_range_max ?? 65535 }}
                    </div>
                    <div v-else class="break-keep whitespace-nowrap">
                        ---
                    </div>
                </td>
                <td>
                    {{ rule.remote_ip_prefix ?? '0.0.0.0/0' }}
                </td>
                <td class="tools">
                    <Button class="btn btn-outline-danger" :loading="true" @click="deleteRule(rule.id)"
                            data-uuid="045c2bd8-fe4a-4838-bed7-72e64e1404ce">
                        Delete it
                    </Button>
                </td>
            </tr>
            <tr>
                <td>
                    <SelectProtocolComponent v-model="selectedProtocol"/>
                </td>
                <td v-if="(selectedProtocol?.value.toUpperCase() ?? '') !== 'ICMP'"
                    class="break-keep whitespace-nowrap">
                    <input class="firewall appearance-none w-1/4" type="number"
                           data-uuid="1c1fe86e-a5e6-41ed-8258-957c0d17ceda"
                           v-on:focusout="checkMinPort($event)"
                           v-on:input="inputMinPort($event)" v-model="minPort">
                    -
                    <input class="firewall appearance-none w-1/4" type="number"
                           data-uuid="260672ce-75c6-42d4-bd1b-aa627c74a0cb"
                           v-on:focusout="checkMaxPort($event)"
                           v-on:input="inputMaxPort($event)" v-model="maxPort">
                </td>
                <td v-else>---</td>
                <td class="break-keep whitespace-nowrap">
                    <IpInputComponent :ip="selectedIp" :on-change="onIpChange" :on-blur="onIpBlur"/>
                    /
                    <input class="firewall appearance-none w-1/6" type="number" min="0" max="255"
                           v-on:input="inputMask($event)" v-model="mask">
                </td>
                <td class="tools">
                    <Button :is_loading="save_loading" @click="saveRule()" class="btn btn-outline-info"
                            data-uuid="9fa4d9ea-45d2-42a2-b6b1-01998a52346c">
                        Save
                    </Button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Button from "../UI/Button.vue";
import SelectProtocolComponent from "./SelectProtocolComponent.vue";
import IpInputComponent from "./IpInputComponent.vue";

export default {
    name: "FirewallComponent",
    props: {
        projectId: {
            required: false,
            default: 1
        },
        securityGroupId: {
            required: false,
            default: 1
        }
    },
    components: {SelectProtocolComponent, Button, IpInputComponent},
    data() {
        let rules = [];
        let add_rules = [];
        let save_loading = false;
        //new
        let selectedProtocol;
        let selectedIp = '0.0.0.0';
        let minPort = 1;
        let maxPort = 65535;
        let mask = 0;

        return {
            rules,
            add_rules,
            save_loading,
            selectedProtocol,
            selectedIp,
            minPort,
            maxPort,
            mask
        }
    },
    methods: {
        addRule() {
            this.save_loading = false;
            this.add_rules.push({
                port_range_min: '',
                port_range_max: '',
                remote_ip_prefix: '',
                protocol: '',
            });
        },
        saveRule() {
            this.save_loading = true;
            let port_range_min = this.minPort;
            let port_range_max = this.maxPort;

            if ((this.selectedProtocol?.value ?? 'tcp').toUpperCase() === 'ICMP') {
                //force 1-255 port range
                port_range_min = 0;
                port_range_max = 255;
            }

            const rule = {
                port_range_min: port_range_min,
                port_range_max: port_range_max,
                remote_ip_prefix: this.selectedIp + '/' + this.mask,
                protocol: this.selectedProtocol?.value ?? 'tcp'
            };
        },
        deleteRule(rule_id) {
        },
        onIpChange(ip) {
            this.selectedIp = ip;
        },
        onIpBlur(ip) {
            this.selectedIp = ip;
        },
        inputMinPort(event) {
            var value = Number(this.minPort);
            if (isNaN(value) || value === '') {
                event.target.value = 1;
                this.minPort = 1;
            } else if (value < 0) {
                event.target.value = 1;
                this.minPort = 1;
            } else if (value > 65535) {
                event.target.value = this.maxPort;
                this.minPort = this.maxPort;
            }
        },
        checkMinPort(event) {
            var value = Number(this.minPort);
            if (isNaN(value)) {
                this.minPort = 1;
            } else if (value > this.maxPort) {
                this.minPort = this.maxPort;
            }
        },
        checkMaxPort(event) {
            var value = Number(this.maxPort);
            if (isNaN(value)) {
                this.maxPort = 1;
            } else if (value < this.minPort) {
                this.maxPort = this.minPort;
            }
        },
        inputMaxPort(event) {
            var value = Number(this.maxPort);
            if (isNaN(value) || value === '') {
                event.target.value = this.minPort;

                this.maxPort = this.minPort;
            } else if (value < 1) {
                event.target.value = this.minPort;
                this.maxPort = this.minPort;
            } else if (value > 65535) {
                event.target.value = 65535;
                this.maxPort = 65535;
            }
        },
        inputMask(event) {
            var value = Number(event.target.value);
            if (isNaN(value) || value === '') {
                event.target.value = 0;
                this.mask = 0;
            } else if (value < 0) {
                event.target.value = 0;
                this.mask = 0;
            } else if (value > 32) {
                event.target.value = 32;
                this.mask = 32;
            }
        }
    },
    computed: {
        ingress_ipv4_rules() {
            return this.rules.filter(_rule => {
                return _rule.direction === 'ingress' && _rule.ethertype === 'IPv4'
            })
        }
    }
}
</script>

<style scoped>

</style>
