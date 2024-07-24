<template>
    <div>
        <div class="d-flex justify-content-end me-5 mt-5 mb-3">
            <!--<BarChart style="width: 300px;height: 300px;"/>-->
            <!--<PieChart style="width: 300px;height: 300px;"/>-->
            <!--<LineChart style="width: 300px;height: 300px;"/>-->
            <el-select v-model="selectedWidget" placeholder="Add widget" 
                class="btn btn-primary bg-primary text-white ps-5" style="width: 15%;">
                <el-option v-for="widget in selectWidgets" :key="widget.id" :label="widget.name" :value="widget.id"
                    @click="addWidget(widget.name)" />
            </el-select>
        </div>
        <div ref="gridStack" class="grid-stack"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import BarChart from '../components/charts/Barchart.vue'
import PieChart from '../components/charts/PieChart.vue'
import LineChart from '../components/charts/LineChart.vue'

export default {
    components: {
        BarChart,
        PieChart,
        LineChart
    },
    data() {
        return {
            selectWidgets: [
                { id: 1, name: 'barChart' },
                { id: 2, name: 'pieChart' },
                { id: 3, name: 'lineChart' },
            ],
        }
    },
    setup() {
        const selectedWidget = ref(null);
        const gridStack = ref(null);
        let grid = null;

        onMounted(() => {
            grid = GridStack.init({}, gridStack.value);
        });

        const addWidget = (chart) => {
            const widgetContent = document.createElement('div');
            widgetContent.classList.add('grid-stack-item');

            if (chart === 'barChart') {
                widgetContent.innerHTML = `
                    <div class="grid-stack-item-content">
                        <button class="remove-widget"><i class="fa-regular fa-circle-xmark"></i></button>
                         <p>barChart</p>
                    </div>`
            } else if (chart === 'pieChart') {
                widgetContent.innerHTML = `
                    <div class="grid-stack-item-content">
                        <button class="remove-widget"><i class="fa-regular fa-circle-xmark"></i></button>
                        <p>pieChart</p>
                    </div>`;
            } else {
                widgetContent.innerHTML = `
                    <div class="grid-stack-item-content">
                        <button class="remove-widget"><i class="fa-regular fa-circle-xmark"></i></button>
                        <p>LineChart</p>
                    </div>`;
            }

            grid.addWidget(widgetContent, { w: 3, h: 2 });
            widgetContent.querySelector('button').addEventListener('click', () => {
                grid.removeWidget(widgetContent);
            });
        };

        return {
            gridStack,
            addWidget
        };
    }
};
</script>
<style>
.el-icon {
    opacity: 0;
}

.el-select__selected-item,
.el-select__wrapper {
    background-color: #0d6efd !important;
    color: white !important;
    box-shadow: none !important;
}

.remove-widget {
    background-color: red;
    color: white;
    border-radius: 5px;
}

.grid-stack {
    background-color: #eaeaea;
}

.grid-stack-item-content {
    background-color: #ffffff;
}
</style>