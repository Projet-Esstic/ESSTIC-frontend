<template>
  <nav class="bg-white dark:bg-gray-800 shadow mb-6 rounded-lg">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex space-x-8">
            <router-link
              to="/entrance-exam"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                $route.name === 'EntranceExam'
                  ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              ]"
            >
              <i class="material-icons mr-2">event</i>
              Entrance Exams
            </router-link>

            <router-link
              to="/entrance-exam/courses"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                $route.name === 'CourseManagement'
                  ? 'border-b-2 border-blue-500 text-gray-900 dark:text-white'
                  : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              ]"
            >
              <i class="material-icons mr-2">book</i>
              Courses
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'EntranceExamNav'
}
</script>
