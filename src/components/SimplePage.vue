<template>
    <div>
        <h1 class="text-xs-center">{{tableProps.H1Content}}</h1>
        <h2>{{tableProps.TableName}}</h2>
        <table>
            <tr>
                <td v-for="(item, index) in colsOrder" :key="item">
                    <span @click="move(index, -1)">&#8592; </span>
                    {{tableProps.ColsTitles[item]}}
                    <span @click="move(index, 1)"> &#8594;</span>
                </td>
            </tr>
            <tr v-for="(cols, colsIndex) in tableProps.Data">
                <td v-for="item in colsOrder" @dblclick="editItem(colsIndex, item)">
                    <span class="unselected-item"
                          v-if="!(editedItem.index === colsIndex && editedItem.itemName === item)">
                        {{cols[item]}}
                    </span>
                    <span v-else>
                        <input type="text"
                               v-model="selectedItem"
                               id="selected-item"
                               @blur="setSelectedItem"
                               @keyup.enter="setSelectedItem">
                    </span>
                </td>
            </tr>
        </table>
        <a :href="href"
           :download="download"
           v-if="showLink">
            Скачать файл
        </a>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    const name = 'myfile.json';

    export default {
        props: ['tableProps'],
        data() {
            return {
                editedItem: {},
                selectedItem: '',
                showLink: null,
                href: '',
                download: null,
            }
        },
        created() {
            document.title = this.tableProps.PageTitle;
            const sortCols = (a, b) => {
                if (this.tableProps.ColsOrder[a] > this.tableProps.ColsOrder[b]) return 1;
                if (this.tableProps.ColsOrder[a] < this.tableProps.ColsOrder[b]) return -1;
            };
            const colsOrder = Object.keys(this.tableProps.ColsOrder)
                .sort(sortCols)
                .filter(item => this.tableProps.ColsShow[item] === 1);
            this.$store.commit('setColsOrder', colsOrder);
        },
        methods: {
            move(index, shift) {
                const colsOrder = [...this.colsOrder];
                const currentItem = colsOrder[index];
                if (colsOrder[index + shift]) {
                    colsOrder[index] = colsOrder[index + shift];
                    colsOrder[index + shift] = currentItem;
                    this.$store.commit('setColsOrder', colsOrder);
                }
            },
            editItem(index, itemName) {
                this.editedItem = {index, itemName};
                this.selectedItem = this.tableProps.Data[index][itemName];
                setTimeout(() => {
                    const el = document.getElementById('selected-item');
                    if (el) {
                        el.focus();
                    }
                }, 0);
            },
            setSelectedItem() {
                this.$store.commit('setSelectedItem', {editedItem: this.editedItem, selectedItem: this.selectedItem});
                this.editedItem = {};
                this.selectedItem = '';
                this.createJSON();
                this.showLink = true;
            },
            createJSON() {
                const  file = new Blob([JSON.stringify(this.$store.state.data)], {type: 'text/json'});
                this.href = URL.createObjectURL(file);
                this.download = name;
            }
        },
        computed: mapState({
            colsOrder: state => state.colsOrder,
        }),
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    table {
        border-collapse: collapse;
    }

    td {
        width: 150px;
        border: 1px solid black;
        padding: 5px;
    }

    .unselected-item {
        user-select: none;
    }
</style>
