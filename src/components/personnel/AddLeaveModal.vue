<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Add Leave</h2>
            <form @submit.prevent="save">
                <label for="leaveType">Leave Type:</label>
                <select id="leaveType" v-model="leave.leaveType" required>
                    <option value="sick">Sick</option>
                    <option value="vacation">Vacation</option>
                    <option value="maternity">Maternity</option>
                    <option value="personal">Personal</option>
                </select>
                <label for="leaveStartDate">Start Date:</label>
                <input type="date" id="leaveStartDate" v-model="leave.leaveStartDate" required>
                <label for="leaveEndDate">End Date:</label>
                <input type="date" id="leaveEndDate" v-model="leave.leaveEndDate" required>
                <label for="reason">Reason:</label>
                <textarea id="reason" v-model="leave.reason"></textarea>
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
            leave: {
                leaveType: 'sick',
                leaveStartDate: '',
                leaveEndDate: '',
                reason: '',
            },
        };
    },
    methods: {
        save() {
            this.$emit('save', this.leave);
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