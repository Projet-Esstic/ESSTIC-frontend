<template>
    <section>
        <h2>Performance Reviews</h2>
        <button @click="$emit('add-review')">Add Review</button>
        <ul>
            <li v-for="review in reviews" :key="review._id">
                <p><strong>Date:</strong> {{ formatDate(review.reviewDate) }}</p>
                <p><strong>Rating:</strong> {{ review.rating }}</p>
                <p><strong>Comments:</strong> {{ review.comments }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        reviews: {
            type: Array,
            default: () => []  // Default to an empty array
        }
    },
    async created() {
      console.log(this.reviews)
      console.log(this.reviews)
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        }
    }
};
</script>
