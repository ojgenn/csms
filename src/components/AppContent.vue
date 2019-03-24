<template>
    <div>
        <v-container>
            <v-btn color="primary" @click="getData">Обработать данные</v-btn>
            <simple-page :tableProps="props" v-if="props"></simple-page>
            <div v-if="!!error">Ошибка при загрузке данных</div>
        </v-container>
    </div>
</template>

<script>
    import SimplePage from '@/components/SimplePage';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {}
        },
        methods: {
            getData() {
                this.$store.dispatch('getData');
            }
        },
        computed: mapState({
            props: state => state.data,
            error: state => state.error,
        }),
        components: {
            SimplePage
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h1 {
        margin-top: 30px;
        margin-bottom: 15px;
    }

    h2 {
        margin-bottom: 15px;
    }
</style>
