<template>
    <div>
      <h3 class="text-xl font-semibold mb-4">Leave History</h3>
      <div v-for="(leave, index) in formData.leaveHistory" :key="index" class="space-y-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Leave Type</label>
          <select v-model="leave.leaveType" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="sick">Sick</option>
            <option value="vacation">Vacation</option>
            <option value="maternity">Maternity</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Leave Start Date</label>
          <input v-model="leave.leaveStartDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Leave End Date</label>
          <input v-model="leave.leaveEndDate" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Approval Status</label>
          <select v-model="leave.approvalStatus" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Reason</label>
          <textarea v-model="leave.reason" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>
      </div>
      <button @click="addLeave" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add Leave</button>
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
    methods: {
      addLeave() {
        this.formData.leaveHistory.push({
          leaveType: '',
          leaveStartDate: '',
          leaveEndDate: '',
          approvalStatus: '',
          reason: ''
        });
      }
    }
  }
  </script>