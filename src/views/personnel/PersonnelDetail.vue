<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Personnel Details</h1>

        <div v-if="personnel" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information Section -->
            <section class="bg-black p-6 shadow-lg rounded-lg">
                <h2 class="text-2xl font-semibold mb-4">Basic Information</h2>
                <p><strong class="text-gray-600">Full Name:</strong>
                    <!-- {{ personnel.performanceReviews }} -->
                    {{ personnel.user.fullName }}
                </p>
                <p><strong class="text-gray-600">Email:</strong> {{ personnel.user.email }}</p>
                <p><strong class="text-gray-600">Date of Birth:</strong> {{ formatDate(personnel.user.dateOfBirth) }}
                </p>
                <p><strong class="text-gray-600">Status:</strong> {{ personnel.user.status }}</p>
                <p><strong class="text-gray-600">Role:</strong> {{ personnel.user.roles.join(', ') }}</p>
                <p><strong class="text-gray-600">Profile Picture:</strong>
                    <img :src="`/images/${personnel.user.profilePicture}`" alt="Profile Picture"
                        class="w-24 h-24 rounded-full mt-2">
                </p>
                <p><strong class="text-gray-600">Created At:</strong> {{ formatDate(personnel.user.createdAt) }}</p>
                <p><strong class="text-gray-600">Updated At:</strong> {{ formatDate(personnel.user.updatedAt) }}</p>
            </section>

            <!-- Employment Section -->
            <section class="bg-black p-6 shadow-lg rounded-lg">
                <h2 class="text-2xl font-semibold mb-4 text-white">Employment Details</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Employment Status -->
                    <div>
                        <p><strong class="text-gray-400">Employment Status:</strong></p>
                        <select v-model="personnel.employmentStatus" @change="updateEmploymentStatus"
                            class="border bg-black text-white p-2 rounded w-full">
                            <option value="active">Active</option>
                            <option value="onLeave">On Leave</option>
                            <option value="retired">Retired</option>
                            <option value="terminated">Terminated</option>
                        </select>
                        <button @click="saveEmploymentStatus"
                            class="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save Status</button>
                    </div>

                    <!-- Department -->
                    <div>
                        <p><strong class="text-gray-400">Department:</strong></p>
                        <select v-model="personnel.department" @change="updateDepartment"
                            class="border bg-black text-white p-2 rounded w-full">
                            <option v-for="dept in departments" :key="dept._id" :value="dept._id">{{ dept.name }}
                            </option>
                        </select>
                        <button @click="saveDepartment"
                            class="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save Department</button>
                    </div>

                    <!-- Hire Date -->
                    <div>
                        <p><strong class="text-gray-400">Hire Date:</strong> {{ formatDate(personnel.hireDate) }}</p>
                    </div>
                </div>
            </section>


            <!-- Salary Section -->
            <section class="bg-black p-6 shadow-lg rounded-lg">
                <h2 class="text-2xl font-semibold mb-4">Salary Information</h2>
                <p><strong class="text-gray-600">Amount:</strong> {{ personnel.salary.amount }}</p>
                <p><strong class="text-gray-600">Payment Method:</strong> {{ personnel.salary.paymentMethod }}</p>
                <p><strong class="text-gray-600">Paid Date:</strong> {{ formatDate(personnel.salary.paidDate) }}</p>
            </section>
        </div>

        <!-- Performance Reviews Section -->
        <!-- <PerformanceReviews :reviews="personnel.performanceReviews" @add-review="openAddPerformanceReviewModal" /> -->
        <!-- <section>
            <h2>Performance Reviews</h2>
            <button @click="openAddPerformanceReviewModal">Add Review</button>
            <ul>
                <li v-for="review in personnel.performanceReviews" :key="review._id">
                    <p><strong>Date:</strong> {{ formatDate(review.reviewDate) }}</p>
                    <p><strong>Rating:</strong> {{ review.rating }}</p>
                    <p><strong>Comments:</strong> {{ review.comments }}</p>
                </li>
            </ul>
        </section> -->
        <!-- Training Programs Section -->
        <!-- <TrainingPrograms :programs="personnel.trainingPrograms" @add-program="openAddTrainingProgramModal" /> -->

        <!-- Leave History Section -->
        <!-- <LeaveHistory :leaveHistory="personnel.leaveHistory" @add-leave="openAddLeaveModal" /> -->

        <!-- Modals for Adding New Entries -->
        <AddPerformanceReviewModal v-if="showAddPerformanceReviewModal" @close="closeAddPerformanceReviewModal"
            @save="addPerformanceReview" />
        <AddTrainingProgramModal v-if="showAddTrainingProgramModal" @close="closeAddTrainingProgramModal"
            @save="addTrainingProgram" />
        <AddLeaveModal v-if="showAddLeaveModal" @close="closeAddLeaveModal" @save="addLeave" />
    </div>
</template>

<script>
import axios from '../../api/client.js';
import { ENDPOINTS } from '../../api/config.js';
import PerformanceReviews from '@/components/personnel/PerformanceReviews.vue';
import TrainingPrograms from '@/components/personnel/TrainingPrograms.vue';
import LeaveHistory from '@/components/personnel/LeaveHistory.vue';
import AddPerformanceReviewModal from '@/components/personnel/AddPerformanceReviewModal.vue';
import AddTrainingProgramModal from '@/components/personnel/AddTrainingProgramModal.vue';
import AddLeaveModal from '@/components/personnel/AddLeaveModal.vue';

export default {
    components: {
        PerformanceReviews,
        TrainingPrograms,
        LeaveHistory,
        AddPerformanceReviewModal,
        AddTrainingProgramModal,
        AddLeaveModal,
    },
    data() {
        return {
            personnel: null,
            departments: [], // Fetch this from your backend
            showAddPerformanceReviewModal: false,
            showAddTrainingProgramModal: false,
            showAddLeaveModal: false,
        };
    },
    async created() {
        await this.fetchPersonnel();
        await this.fetchDepartments();
    },
    methods: {
        async fetchPersonnel() {
            try {
                const response = await axios.get(`${ENDPOINTS.PERSONNEL}/${this.$route.params.id}`);
                this.personnel = response.data;
                // console.log(this.personne.users);
            } catch (error) {
                console.error('Error fetching personnel details:', error);
            }
        },
        async fetchDepartments() {
            try {
                const response = await axios.get(ENDPOINTS.DEPARTMENT);
                this.departments = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des départements :', error);
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },

        async saveEmploymentStatus() {
            try {
                await axios.put(`${ENDPOINTS.PERSONNEL}/${this.$route.params.id}`, {
                    employmentStatus: this.personnel.employmentStatus,
                });
                alert('Employment status saved successfully!');
            } catch (error) {
                console.error('Error saving employment status:', error);
            }
        },

        async saveDepartment() {
            try {
                await axios.put(`${ENDPOINTS.PERSONNEL}/${this.$route.params.id}`, {
                    department: this.personnel.department,
                });
                alert('Department saved successfully!');
            } catch (error) {
                console.error('Error saving department:', error);
            }
        },
        openAddPerformanceReviewModal() {
            this.showAddPerformanceReviewModal = true;
        },
        closeAddPerformanceReviewModal() {
            this.showAddPerformanceReviewModal = false;
        },
        async addPerformanceReview(review) {
            try {
                await axios.post(`/api/personnel/${this.personnel._id}/performance-reviews`, review);
                await this.fetchPersonnel();
                this.closeAddPerformanceReviewModal();
            } catch (error) {
                console.error('Error adding performance review:', error);
            }
        },
        openAddTrainingProgramModal() {
            this.showAddTrainingProgramModal = true;
        },
        closeAddTrainingProgramModal() {
            this.showAddTrainingProgramModal = false;
        },
        async addTrainingProgram(program) {
            try {
                await axios.post(`/api/personnel/${this.personnel._id}/training-programs`, program);
                await this.fetchPersonnel();
                this.closeAddTrainingProgramModal();
            } catch (error) {
                console.error('Error adding training program:', error);
            }
        },
        openAddLeaveModal() {
            this.showAddLeaveModal = true;
        },
        closeAddLeaveModal() {
            this.showAddLeaveModal = false;
        },
        async addLeave(leave) {
            try {
                await axios.post(`/api/personnel/${this.personnel._id}/leave-history`, leave);
                await this.fetchPersonnel();
                this.closeAddLeaveModal();
            } catch (error) {
                console.error('Error adding leave:', error);
            }
        },
    },
};
</script>

<style scoped>
section {
    margin-bottom: 20px;
}
</style>
