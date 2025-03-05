<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Performance Reviews</h3>
      <div v-for="(review, index) in formData.performanceReviews" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Review Date</label>
          <input v-model="review.reviewDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Reviewer</label>
          <input v-model="review.reviewer" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Rating</label>
          <input v-model="review.rating" type="number" min="1" max="5" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Comments</label>
          <textarea v-model="review.comments" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
      </div>
      <button @click="addReview" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Review</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      formData: {
        type: Object,
        required: true
      }
    },
    emits: ['update:formData'], // Declare the emitted event
    methods: {
      updateReviewField(index, field, value) {
        const updatedReviews = [...this.formData.performanceReviews];
        updatedReviews[index][field] = value;
        this.$emit('update:formData', { ...this.formData, performanceReviews: updatedReviews });
      },
      addReview() {
        const newReview = {
          reviewDate: '',
          reviewer: '',
          rating: 0,
          comments: '',
        };
        const updatedReviews = [...this.formData.performanceReviews, newReview];
        this.$emit('update:formData', { ...this.formData, performanceReviews: updatedReviews });
      },
    },
  }
  </script>