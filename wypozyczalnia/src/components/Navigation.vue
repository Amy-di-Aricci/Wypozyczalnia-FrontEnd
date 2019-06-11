<template>
    <nav>
    <v-toolbar
            dark
            scroll-off-screen
            app
            clipped-left
            id="top-toolbar">
        <v-toolbar-side-icon @click="drawer = !drawer"/>
        <v-toolbar-title>System wypożyczeń</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
            dark
            absolute
            width="260"
            clipped
            app
            v-model="drawer"
    >
        <v-divider></v-divider>

        <v-list dense class="pt-0">
            <v-list-tile
                    v-for="item in items"
                    :key="item.title"
                    @click=""
            >
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {title: 'Home', icon: 'dashboard'},
                    {title: 'About', icon: 'question_answer'}
                ],
                right: null,
                drawer: true
            }
        }
    }
</script>


<style scoped>

</style>