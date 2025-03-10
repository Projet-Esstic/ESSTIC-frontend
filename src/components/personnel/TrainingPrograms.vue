<template>
    <section>
        <h2>Training Programs</h2>
        <button @click="$emit('add-program')">Add Program</button>
        <ul>
            <li v-for="program in programs" :key="program._id">
                <p><strong>Program Name:</strong> {{ program.programName }}</p>
                <p><strong>Date Completed:</strong> {{ formatDate(program.dateCompleted) }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        programs: Array,
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
    },
};
</script>