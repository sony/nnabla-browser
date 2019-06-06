<template>
    <div class="profile-csv-result-table">
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th class="profile-th" scope=col v-for="(item, index) in tableHeader" :key=index>
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tableContent" :key=index>
                    <td v-for="(content, ind) in item" :key=ind>
                        <template v-if="ind!==3 && ind!==5">{{ content }}</template>
                        <template v-if="ind===3">
                            <div class="forward_occu" :style="getBarStyle(content)"><br></div>
                        </template>
                        <template v-if="ind===5">
                            <div class="backward_occu" :style="getBarStyle(content)"><br></div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            tableHeader: [],
            tableContent: [],
        }
    },
    props: {
        profileData: Object,
    },
    methods: {
        capitalize: function(value) {
                if (!value) return '';
                value = value.toString();
                return value.charAt(0).toUpperCase() + value.slice(1);
        },
        getBarStyle: function(con) {
            return {
                width: con,
            }
        },
        profileInit: function() {
            const dataArray = this.profileData.data.map(x => x.slice());
            dataArray[0].splice(5,0,'forward_occupancy');
            dataArray[0].splice(7,0,'backward_occupancy');
            // first row in dataArray contains table heads
            const tmph = dataArray.shift().map(x => this.capitalize(x));
            // [Parameter_scope,Function_name] [Forward,Forward_occupancy,Backward,Backward_occupancy]
            this.tableHeader = [...tmph.slice(0, 2), ...tmph.slice(4, 8)];
            this.tableContent = dataArray.map(x => {
                const tmpf = (x[4] / this.profileData['forward all'] * 100).toFixed(2);
                const tmpb = (x[5] / this.profileData['backward all'] * 100).toFixed(2);
                return [x[0], x[1], x[4], `${tmpf}%`, x[5], `${tmpb}%`];
            });
        },
    },
    created: function() {
        this.profileInit();
    },
    watch: {
        profileData: {
            handler: function(val, oldVal) {
                if(val != oldVal){
                    this.profileInit();
                }
            },
            deep: true,
        }
    }
}
</script>

<style>
div .profile-csv-result-table{
    height: 100%;
    overflow: scroll;
    padding: 10px;
    font-size: 18px;
}

.profile-th {
    text-align: center;
}

.forward_occu {
    background-color: var(--color-layer3);
}

.backward_occu {
    background-color: var(--color-layer1);
}
</style>
