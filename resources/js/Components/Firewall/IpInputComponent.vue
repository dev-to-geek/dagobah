<template>
    <div id="ipInputContainer" @focusin="onFocusIn" @focusout="onFocusOut" class="ip-input-container" tabindex="0">
        <div class="ip-segment" v-for="(segment, index) in segments">
            <input type="text" maxlength="3" @click="makeFocus" class="ip-segment-input" :value="segment"
                   :placeholder="placeholder"
                   data-uuid="c712c2ed-a55e-4aeb-8c16-b378d7ea93f8"
                   v-on:keydown="onInputKeydown($event, index)"
                   v-on:input="onInput($event, index)"
                   v-on:blur="onInputBlur()"
                   v-on:paste="onPaste($event, index)">
            <i v-show="index != segments.length - 1">.</i>
        </div>
    </div>
</template>

<script>
/* global document*/
/**
 * get the cursor position of the element
 * @param  {Element} el the element
 * @return {Integer}    the position fo the cursor
 */
function getRange(el) {
    var cuRange;
    var tbRange;
    var headRange;
    var range;
    var dupRange;
    var ret = {};
    if (el.setSelectionRange) {
        // standard
        ret.begin = el.selectionStart;
        ret.end = el.selectionEnd;
        ret.result = el.value.substring(ret.begin, ret.end);
    } else if (document.selection) {
        // ie
        if (el.tagName.toLowerCase() === 'input') {
            cuRange = document.selection.createRange();
            tbRange = el.createTextRange();
            tbRange.collapse(true);
            tbRange.select();
            headRange = document.selection.createRange();
            headRange.setEndPoint('EndToEnd', cuRange);
            ret.begin = headRange.text.length - cuRange.text.length;
            ret.end = headRange.text.length;
            ret.result = cuRange.text;
            cuRange.select();
        } else if (el.tagName.toLowerCase() === 'textarea') {
            range = document.selection.createRange();
            dupRange = range.duplicate();
            dupRange.moveToElementText(el);
            dupRange.setEndPoint('EndToEnd', range);
            ret.begin = dupRange.text.length - range.text.length;
            ret.end = dupRange.text.length;
            ret.result = range.text;
        }
    }
    el.focus();
    return ret;
}
export default {
    props: {
        ip: {
            type: String,
            required: true
        },
        placeholder: String,
        onChange: Function,
        onBlur: Function
    },
    data() {
        return {
            segments: ['', '', '', '']
        };
    },
    watch: {
        ip(ip) {
            this.syncIp(ip);
        }
    },
    methods: {
        onInputKeydown(event, index) {
            var keyCode = event.keyCode || event.which;
            var value = event.target.value;
            if (keyCode === 8 || keyCode === 37) {
                // move the cursor to previous input if backspace and left arrow is pressed at the begin of one input
                if ((value.length === 0 || getRange(event.target).end === 0) &&
                    index > 0) {
                    this.$el.getElementsByTagName('input')[index - 1].focus();
                    // When jump to pre input(enter "backspace"), thr cursor should in the end.
                    // before fix: 127.|0.0.0  =>   12|7.0.0.1
                    // after fix: 127.|0.0.0 = >   127|.0.0.0
                    // notes: "|" mean the cursor position.
                    event.preventDefault();
                }
            } else if (keyCode === 39) {
                if (getRange(event.target).end === value.length && index < 3) {
                    // move to cursor to the next input if right arrow is pressed at the end of one input
                    this.$el.getElementsByTagName('input')[index + 1].focus();
                }
            }
        },
        onInput(event, index) {
            var value = event.target.value;
            event.target.value = this.segments[index];
            var segment = Number(value);
            if (isNaN(segment)) {
                return;
            } else if (value === '') {
                this.segments.splice(index, 1, '');
            } else if (segment > 255 || segment < 0) {
                // set the segment to 255 if out of ip range
                this.segments.splice(index, 1, 255);
            } else {
                this.segments.splice(index, 1, segment);
            }
            // jump to next input
            if (value.length === 3 && index < 3 || value[value.length - 1] === '.') {
                this.$el.getElementsByTagName('input')[index + 1].focus();
            }
        },
        onInputBlur() {
            setTimeout(() => {
                var className = document.activeElement.className;
                if (className.indexOf('ip-segment-input') === -1) {
                    if (this.onBlur) {
                        this.onBlur(this.segments.join('.'));
                    }
                }
            }, 50);
        },
        onPaste(e, index) {
            var pasteText = e.clipboardData.getData('text/plain');
            var segments = pasteText.split('.');
            segments.forEach((segment, i) => {
                if (index + i < 4 && !isNaN(segment) &&
                    segment >= 0 && segment <= 255) {
                    this.segments.splice(index + i, 1, segment);
                }
            });
            e.preventDefault();
        },
        syncIp(ip) {
            if (ip && ip.indexOf('.') !== -1) {
                ip.split('.').map((segment, index) => {
                    if (isNaN(segment) || segment < 0 || segment > 255) {
                        segment = 255;
                    }
                    this.segments.splice(index, 1, segment);
                    return segment;
                });
            }
        },
        onFocusIn() {
            document.getElementById('ipInputContainer').classList.add('ipInputFocused')
        },
        onFocusOut() {
            document.getElementById('ipInputContainer').classList.remove('ipInputFocused')
        }
    },
    mounted() {
        this.syncIp(this.ip);
        this.$watch(() => {
            return this.segments.join('.');
        }, (val, oldValue) => {
            if (val !== oldValue) {
                if (val === '...') {
                    val = '';
                }
                if (this.onChange) {
                    this.onChange(val);
                }
            }
        });
    }
};
</script>

<style lang="sass-loader" scoped>

</style>
