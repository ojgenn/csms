<template>
    <v-app>
        <app-header></app-header>
        <v-content>
            <app-content></app-content>
        </v-content>
        <app-footer></app-footer>
    </v-app>
</template>

<script>
    import AppHeader from '@/components/AppHeader'
    import AppContent from '@/components/AppContent'
    import AppFooter from '@/components/AppFooter'

    export default {
        components: {
            AppHeader,
            AppContent,
            AppFooter
        }
    }
</script>
