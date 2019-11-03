<template>
    <div class="col card box">
        <div class="img-container border-bottom border-dark">
            <img :src="spriteLink" class="card-img-top w-50"/>
        </div>
        <div class="card-body">
            <ul class="list card-text">
                <li>Name : {{ currentBerry.name.firstLetterToUpper() }}</li>
                <li>Size : {{ currentBerry.specs.size }}</li>
                <li>Growth time : {{ currentBerry.specs.growthTime }}</li>
                <li>More details <router-link :to="{name: 'berry-view', params: { berryId: currentBerry.id } }">
                    here
                </router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'BerryBox',
        props: {
            berry: Object
        },
        computed: {
            currentBerry: function () {
                return this.$props.berry;
            },
            spriteLink: function () {
                return require("@/assets/images/berries/" + this.currentBerry.sprite)
            }
        },
        created () {
        }
    }

</script>

<style>

</style>