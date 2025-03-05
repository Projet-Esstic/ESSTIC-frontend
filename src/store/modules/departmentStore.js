// // stores/departmentStore.js
// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import { departmentService } from '@/api/services'

// export const useDepartmentStore = defineStore('department', () => {
//   const departments = ref([])
//   const isLoading = ref(false)
//   const error = ref(null)

//   async function fetchDepartments() {
//     // Only fetch if not already loaded
//     if (departments.value.length === 0) {
//       isLoading.value = true
//       try {
//         departments.value = await departmentService.getAllDepartments()
//       } catch (err) {
//         error.value = err.message
//         console.error('Failed to load departments:', err)
//       } finally {
//         isLoading.value = false
//       }
//     }
//   }

//   return {
//     departments,
//     isLoading,
//     error,
//     fetchDepartments
//   }
// })