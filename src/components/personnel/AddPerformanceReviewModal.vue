<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Add Performance Review</h2>
            <form @submit.prevent="save">
                <label for="reviewDate">Review Date:</label>
                <input type="date" id="reviewDate" v-model="review.reviewDate" required>
                <label for="rating">Rating:</label>
                <input type="number" id="rating" v-model="review.rating" min="1" max="5" required>
                <label for="comments">Comments:</label>
                <textarea id="comments" v-model="review.comments"></textarea>
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
            review: {
                reviewDate: '',
                rating: 1,
                comments: '',
            },
        };
    },
    methods: {
        save() {
            this.$emit('save', this.review);
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