<template>
  <div class="mb-6 p-4 bg-white rounded shadow-md">
    <h2 class="text-xl font-semibold mb-4">Add Course</h2>
    <form @submit.prevent="addCourse">
      <input v-model="courseName" placeholder="Course Name" class="border rounded p-2 mb-2 w-full" required />
      <input v-model="courseCode" placeholder="Course Code" class="border rounded p-2 mb-2 w-full" required />
      <input v-model="duration" type="number" placeholder="Duration (minutes)" class="border rounded p-2 mb-2 w-full" required />
      <input v-model="totalMarks" type="number" placeholder="Total Marks" class="border rounded p-2 mb-2 w-full" required />
      <button type="submit" class="bg-blue-500 text-white rounded p-2">Add Course</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      courseName: '',
      courseCode: '',
      duration: '',
      totalMarks: ''
    };
  },
  methods: {
    ...mapMutations('entranceExam', ['setCourses']),
    addCourse() {
      const newCourse = {
        id: Date.now().toString(),
        name: this.courseName,
        code: this.courseCode,
        duration: this.duration,
        totalMarks: this.totalMarks
      };
      this.setCourses([...this.courses, newCourse]);
      this.courseName = '';
      this.courseCode = '';
      this.duration = '';
      this.totalMarks = '';
    }
  }
};
</script>
