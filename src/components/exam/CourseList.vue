<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Course List</h2>
    <ul class="list-disc pl-5">
      <li v-for="course in courses" :key="course.id" class="border-b py-2">
        {{ course.name }} ({{ course.code }}) - {{ course.duration }} min - {{ course.totalMarks }} marks
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      required: true
    }
  }
};
</script>
