<template>
    <div class="row">
        <berry-box
            v-for="(berry, index) in $props.berries"
            :key="index"
            :berry="berry"
        ></berry-box>
    </div>
</template>

<script>

    import BerryBox from './BerryBox.vue';

    export default {
        name: 'BerriesContainer',
        components: { BerryBox },
        props: {
            berries: Array
        }
    }

</script>