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
                        {{ rule.portRage.min ?? 1 }}-{{ rule.portRage.max ?? 65535 }}
                    </div>
                    <div v-else class="break-keep whitespace-nowrap">
                        ---
                    </div>
                </td>
                <td>
                    {{ rule.remoteIpPrefix ?? '0.0.0.0/0' }}
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
                    <input id="minPort" class="firewall appearance-none w-1/4" type="number"
                           data-uuid="1c1fe86e-a5e6-41ed-8258-957c0d17ceda"
                           v-on:focusout="checkPort($event)"
                           v-model="minPort">
                    -
                    <input id="maxPort" class="firewall appearance-none w-1/4" type="number"
                           data-uuid="260672ce-75c6-42d4-bd1b-aa627c74a0cb"
                           v-on:focusout="checkPort($event)"
                           v-model="maxPort">
                </td>
                <td v-else>---</td>
                <td class="break-keep whitespace-nowrap">
                    <IpInputComponent :ip="selectedIp" :on-change="changeIp" :on-blur="changeIp"/>
                    /
                    <input id="mask" class="firewall appearance-none w-1/6" type="number" min="0" max="255"
                           v-on:focusout="inputMask($event)" v-model="mask">
                </td>
                <td class="tools">
                    <Button :is_loading="isSaving" @click="saveRule()" class="btn btn-outline-info"
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
    components: { SelectProtocolComponent, Button, IpInputComponent },
    data() {
        const minPort = 1;
        const maxPort = 65535;

        const rules = [];
        const addRules = [];

        let isSaving = false;

        let selectedProtocol;
        let selectedIp = '0.0.0.0';
        let mask = 0;

        const config = {
            port: {
                min: 1,
                max: 65535
            },
            icmp: {
                min: 0,
                max: 255
            },
            mask: {
                min: 0,
                max: 32
            }
        }

        return {
            rules,
            addRules,
            isSaving,
            selectedProtocol,
            selectedIp,
            minPort,
            maxPort,
            mask,
            config
        }
    },
    methods: {
        addRule() {
            this.isSaving = false;
            this.addRules.push({
                portRange: {
                    min: '',
                    max: ''
                },
                remoteIpPrefix: '',
                protocol: '',
            });
        },
        saveRule() {
            this.isSaving = true

            const isICMP = (this.selectedProtocol?.value ?? 'tcp').toUpperCase() === 'ICMP'
            const portRange = {
                min: isICMP ? config.icmp.min : this.minPort,
                max: isICMP ? config.icmp.max : this.maxPort
            }

            const rule = {
                portRange: portRange,
                remoteIpPrefix: `${ this.selectedIp }/${ this.mask }`,
                protocol: this.selectedProtocol?.value ?? 'tcp'
            }
        },
        changeIp(changingIp) {
            this.selectedIp = changingIp
        },
        inputDefault(which, event) {
            const defaultVal = which === 'min' ? this.config.port.min : this.config.port.max

            if (which === 'min') this.minPort = defaultVal
            else this.maxPort = defaultVal

            event.target.value = defaultVal
        },
        checkPort(event) {
            if (event.target.id === 'minPort') {
                if (!('' + this.minPort).length || isNaN(this.minInputNum) || this.minInputNum <= 0) this.inputDefault('min', event)
                else if (this.minInputNum > this.maxInputNum) {
                    event.target.value = this.maxPort;
                    this.minPort = this.maxPort;
                }
            } else {
                if (!('' + this.maxPort).length || isNaN(this.maxInputNum) || this.maxInputNum <= 0) this.inputDefault('max', event)
                else if (this.maxInputNum > this.config.port.max) {
                    event.target.value = this.minPort;
                    this.maxPort = this.minPort;
                }
            }
            if (this.maxInputNum < this.minInputNum) this.minPort = this.maxPort
        },
        inputMask(event) {
            console.log(event.target.value)
            if (isNaN(this.maskNum) || event.target.value === '' || this.maskNum < 0) this.mask = this.config.mask.min
            else if (this.maskNum > 32) this.mask = this.config.mask.max
        }
    },
    computed: {
        ingress_ipv4_rules() {
            return this.rules.filter(_rule => {
                return _rule.direction === 'ingress' && _rule.ethertype === 'IPv4'
            })
        },
        minInputNum() {
            return Number(this.minPort)
        },
        maxInputNum() {
            return Number(this.maxPort)
        },
        maskNum() {
            return Number(document.getElementById('mask').value)
        }
    }
}
</script>

<style scoped>

</style>
