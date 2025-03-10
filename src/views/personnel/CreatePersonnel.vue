<template>
    <div class="min-h-screen bg-black-100 p-6 flex justify-center">
        <div class="bg-black p-8 rounded-lg shadow-md w-full max-w-3xl">
            <h1 class="text-2xl font-bold mb-6 text-center">Créer un Nouveau Personnel</h1>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div v-if="successMessage" class="text-green-500 text-center">{{ successMessage }}</div>
                <div v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block font-medium mb-1">Prénom</label>
                        <input type="text" v-model="formData.firstName"
                            class="w-full p-2 bg-black text-white border rounded" required>
                    </div>
                    <div>
                        <label class="block font-medium mb-1">Nom</label>
                        <input type="text" v-model="formData.lastName"
                            class="w-full p-2 bg-black text-white border rounded" required>
                    </div>
                </div>

                <div>
                    <label class="block font-medium mb-1">Date de Naissance</label>
                    <input type="date" v-model="formData.dateOfBirth"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Email</label>
                    <input type="email" v-model="formData.email" class="w-full p-2 bg-black text-white border rounded"
                        required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Téléphone</label>
                    <input type="text" v-model="formData.phone" class="w-full p-2 bg-black text-white border rounded"
                        required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Adresse</label>
                    <input type="text" v-model="formData.address" class="w-full p-2 bg-black text-white border rounded"
                        required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Poste</label>
                    <input type="text" v-model="formData.position" class="w-full p-2 bg-black text-white border rounded"
                        required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Statut d'emploi</label>
                    <select v-model="formData.employmentStatus" class="w-full p-2 bg-black text-white border rounded">
                        <option value="active">Actif</option>
                        <option value="inactive">Inactif</option>
                    </select>
                </div>

                <div>
                    <label class="block font-medium mb-1">Date d'embauche</label>
                    <input type="date" v-model="formData.hireDate" class="w-full p-2 bg-black text-white border rounded"
                        required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Département</label>
                    <select v-model="formData.department" class="w-full p-2 bg-black text-white border rounded">
                        <option v-for="dept in departments" :key="dept.id" :value="dept.id">{{ dept.name }}</option>
                    </select>
                </div>

                <div>
                    <label class="block font-medium mb-1">Montant du salaire</label>
                    <input type="number" v-model="formData.salary.amount"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Mode de paiement</label>
                    <select v-model="formData.salary.paymentMethod"
                        class="w-full p-2 bg-black text-white border rounded">
                        <option value="bank">Banque</option>
                        <option value="cash">Espèces</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </div>

                <div>
                    <label class="block font-medium mb-1">Date de paiement</label>
                    <input type="date" v-model="formData.salary.paidDate"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>

                <!-- Emergency Contact Section -->
                <div>
                    <label class="block font-medium mb-1">Nom du Contact d'Urgence</label>
                    <input type="text" v-model="formData.emergencyContact.name"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Relation avec le Contact d'Urgence</label>
                    <input type="text" v-model="formData.emergencyContact.relationship"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>

                <div>
                    <label class="block font-medium mb-1">Téléphone du Contact d'Urgence</label>
                    <input type="text" v-model="formData.emergencyContact.phone"
                        class="w-full p-2 bg-black text-white border rounded" required>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    :disabled="loading">
                    <span v-if="loading">Création en cours...</span>
                    <span v-else>Créer Personnel</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from '../../api/client.js';
import { ENDPOINTS } from '../../api/config.js';

export default {
    data() {
        return {
            formData: {
                firstName: "",
                lastName: "",
                email: "",
                position: "",
                phone: "",
                address: "",
                dateOfBirth: "",
                employmentStatus: "",
                hireDate: "",
                department: "",
                salary: {
                    amount: 0,
                    paymentMethod: "",
                    paidDate: ""
                },
                emergencyContact: {
                    name: "",
                    relationship: "",
                    phone: ""
                }
            },
            departments: [],
            loading: false,
            successMessage: "",
            errorMessage: ""
        };
    },
    methods: {
        async submitForm() {
            this.loading = true;
            this.successMessage = "";
            this.errorMessage = "";
            try {
                await axios.post(ENDPOINTS.PERSONNEL_REGISTER, this.formData);
                this.successMessage = "Personnel créé avec succès !";
                setTimeout(() => this.$router.push('/personnel'), 2000);
            } catch (error) {
                this.errorMessage = 'Erreur lors de la création du personnel : ' + (error.response?.data?.message || error.message);
            } finally {
                this.loading = false;
            }
        },
        async fetchDepartments() {
            try {
                const response = await axios.get(ENDPOINTS.DEPARTMENT);
                this.departments = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des départements :', error);
            }
        }
    },
    mounted() {
        this.fetchDepartments();
    }
};
</script>

<style scoped>
button {
    transition: background-color 0.3s;
}
</style>
