<template>
  <div class="invoices-container mt-2" v-if="invoice" dir="rtl">
    <div class="invoice-card" :id="`invoice-${invoice.id}`">
      <div class="invoice-header">
        <h3>ناو: {{ invoice.user.name }}</h3>
        <span class="invoice-date">{{ new Date(invoice.date).toLocaleDateString() }}</span>
      </div>
      <div class="invoice-details">
        <p class="mt-4"><strong>نرخی هەر ئەمپێرێک:</strong> {{ invoice.price }} هەزار دینار</p>
        <p class="mt-4">ژمارەی ئەمپێر: {{ invoice.user.amps }}</p>
        <p class="mt-4"><strong>کۆی گشتی:</strong> {{ invoice.price * invoice.user?.amps }} هەزار دینار</p>
      </div>
    </div>
      <div class="invoice-actions">
        <button class="edit-button mb-3" @click="printInvoices">داگرتنی پسوڵە</button>
        <button class="delete-button" @click="goBack">گەڕاندنەوە</button> <!-- Back button -->
      </div>
  </div>
  <div v-else>
    <p class="mt-4">بارکردنی پەیوەندیدار...</p> 
    <button class="delete-button" @click="goBack">گەڕاندنەوە</button> <!-- Back button -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getInvoicesWithUsers } from '@/tables/invoices';

const router = useRouter();
const route = useRoute();
const invoice = ref(null); 

const goBack = () => {
  router.go(-1); 
};

const fetchInvoice = async (id) => {
  const invoicesWithUsers = await getInvoicesWithUsers();
  invoice.value = invoicesWithUsers.find((inv) => inv.id === Number(id));
};

onMounted(async () => {
  const invoiceId = route.params.id;
  await fetchInvoice(invoiceId);
});

const printInvoices = () => {
  window.print();
};
</script>

<style scoped>
.invoices-container {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  background-color: white;
  color: black;
}

.invoice-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.invoice-header h3 {
  margin: 0;
}

.invoice-details p {
  margin: 5px 0;
}

.invoice-actions {
  margin-top: 10px;
}

.edit-button,
.delete-button ,
.download-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.delete-button {
  background-color: #dc3545; 
  color: white;
}

.delete-button:hover {
  background-color: #c82333;
}

.download-button {
  background-color: #28a745; 
  color: white;
}

.download-button:hover {
  background-color: #218838; 
}
.edit-button {
  background-color: #007BFF; 
  color: white;
}

.edit-button:hover {
  background-color: #0056b3; 
}
@media print {
  .invoice-actions {
    display: none; 
  }
}
</style>
