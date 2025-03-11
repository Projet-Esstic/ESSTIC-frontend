<template>
    <section>
        <h2>Leave History</h2>
        <button @click="$emit('add-leave')">Add Leave</button>
        <ul>
            <li v-for="leave in leaveHistory" :key="leave._id">
                <p><strong>Type:</strong> {{ leave.leaveType }}</p>
                <p><strong>Start Date:</strong> {{ formatDate(leave.leaveStartDate) }}</p>
                <p><strong>End Date:</strong> {{ formatDate(leave.leaveEndDate) }}</p>
                <p><strong>Status:</strong> {{ leave.approvalStatus }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        leaveHistory: Array,
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
    },
};
</script>