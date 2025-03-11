<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Add Training Program</h2>
            <form @submit.prevent="save">
                <label for="programName">Program Name:</label>
                <input type="text" id="programName" v-model="program.programName" required>
                <label for="dateCompleted">Date Completed:</label>
                <input type="date" id="dateCompleted" v-model="program.dateCompleted" required>
                <button type="submit">Save</button>
                <button type="button" @click="close">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            program: {
                programName: '',
                dateCompleted: '',
            },
        };
    },
    methods: {
        save() {
            this.$emit('save', this.program);
        },
        close() {
            this.$emit('close');
        },
    },
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
}
</style>