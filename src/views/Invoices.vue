<template>

  <div class="main-container container">
    <form @submit.prevent="saveInvoice" class="mt-10">

      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input type="number" class="form-control" required v-model="invoiceForm.price" id="invoicePrice" placeholder="نرخ" />
            <label class="form-control-label" for="invoicePrice">نرخ</label>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-3">
          <div class="form-group form-floating">
            <input type="date" class="form-control" required v-model="invoiceForm.date" id="invoiceDate" />
            <label class="form-control-label" for="invoiceDate">بەروار</label>
          </div>
        </div>
       <div class="col-12 col-md-6 col-lg-4 mb-3">
  <div class="form-group form-floating">
    <Dropdown 
      filter
      v-model="invoiceForm.user_id" 
      :options="users"
      optionLabel="name"
      optionValue="id"
      placeholder="بەژداربوو هەڵبژێرە"
      class="custom-dropdown w-full py-3 bg-white md:w-14rem"
    >
      <!-- Customize the display of each option in the dropdown -->
      <template #option="slotProps">
        <div class="flex align-items-center justify-content-start">
          <div> {{ slotProps.option.amps }} | {{ slotProps.option.name }}</div>
        </div>
      </template>

      <!-- Display the selected user in the dropdown value -->
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <div> {{ users.find(user => user.id === slotProps.value)?.amps }} | {{ users.find(user => user.id === slotProps.value)?.name }} </div>
        </div>
        <span v-else>{{ slotProps.placeholder }}</span>
      </template>
    </Dropdown>
  </div>
</div>

      </div>

      <div class="col-12 col-md-6 col-lg-4 mx-auto d-grid">
        <button type="submit" class="btn-success mb-3 py-3 rounded-md">{{ editing ? 'نوێکردنەوەی پسوڵە' : 'زیادکردنی پسوڵە' }}</button>
        <button class="btn-danger py-3 rounded-md" type="button" @click="clearForm">پاکردنەوە</button>
      </div>
    </form>

    <div>
      <div class="search-header d-flex flex-col justify-content-center items-center mt-1">
    <input 
      v-model="searchQuery.month" 
      type="number" 
      placeholder="مانگ" 
      class="search-input"
      @input="searchInvoices"
    />
    <input 
      v-model="searchQuery.year" 
      type="number" 
      placeholder="ساڵ" 
      class="search-input"
      @input="searchInvoices"
    />
   
        <button @click="resetSearch" class="delete-button">پاکردنەوەی گەڕان</button>

  </div>
      <h2 class="text-center my-10">لیستی پسوڵەکان</h2>
      
    <div class="pagination">
      <button class="pagination-button" :disabled="currentPage === 1" @click="prevPage">پێشتر</button>
      <span class="pagination-info">پەڕە {{ currentPage }}</span>
      <button class="pagination-button" @click="nextPage">دواتر</button>
    </div>
  </div>

      <table class="admin-table" style=" font-family: 'NRT'">
        <thead>
          <tr>
            <th>زنجیرە</th>
            <th>بەروار</th>
            <th>نرخ</th>
            <th>کۆی گشتی</th>
            <th>بەکارھێنەر</th>
            <th>کردارەکان</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id" >
            <td>{{ invoice.id }}</td>
            <td>{{ new Date(invoice.date).toLocaleDateString() }}</td>
            <td>{{ invoice.price }}</td>
            <td>{{ invoice.price * invoice.user?.amps }}</td>
            <td>{{ invoice.user?.name || 'نەناسراوە' }}</td>
            <td>
              <button class="show-button" @click="showInvoice(invoice)">بینینی پسوڵە</button>
              <button class="edit-button mb-3" @click="editInvoice(invoice)">نوێکردنەوە</button>
              <button class="delete-button" @click="destroyInvoice(invoice.id)">سرینەوە</button>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>

  <AppToast/>
  <Footer/>
</template>

<script setup>
import Dropdown from 'primevue/dropdown';
import Swal from 'sweetalert2'; // Import SweetAlert2

import AppToast from "@/layouts/AppToast.vue";
import Footer from "@/layouts/Footer.vue";
import { ref, onMounted } from 'vue';
import { addInvoice, updateInvoice, deleteInvoice, fetchInvoicesWithPagination } from '@/tables/invoices';
import {  getUsers } from '@/tables/users';
import { useRouter } from 'vue-router';
const searchQuery = ref({
  month: null,
  year: null,
  invoice_user: "",
});

const fetchInvoices = async () => {
  invoices.value = await fetchInvoicesWithPagination(currentPage.value, itemsPerPage, searchQuery.value);
};

const searchInvoices = () => {
  fetchInvoices();
};
const resetSearch = () => {
  searchQuery.value = {
    month: null,
    year: null,
  };
  fetchInvoices(); 
};
const router = useRouter();
const invoices = ref([]);
const invoiceForm = ref({ id: null, price: null, date: '', user_id: null });
const editing = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const users = ref([]);
const selectedInvoice = ref(null); 

const fetchUsers = async () => {
  users.value = await getUsers();
};


const saveInvoice = async () => {
  if (editing.value) {
    await updateInvoice(invoiceForm.value.id, {
      price: invoiceForm.value.price,
      date: invoiceForm.value.date,
      user_id: invoiceForm.value.user_id
    });
  } else {
    await addInvoice({
      price: invoiceForm.value.price,
      date: invoiceForm.value.date,
      user_id: invoiceForm.value.user_id
    });
  }
  clearForm();
  fetchInvoices();
};

const editInvoice = (invoice) => {
  invoiceForm.value = { ...invoice };
  editing.value = true;
};

const destroyInvoice = async (id) => {
  const result = await Swal.fire({
    title: 'آیا دڵنیایت؟',
    text: "بە سرینەوەی ئەم دەیتایە ناتوانیت دووبارە ئەم زانیاریە بگەڕێنیتەوە!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'بەڵێ',
    cancelButtonText: 'نەخێر'
  });

  if (result.isConfirmed) {
    try {
      await deleteInvoice(id); // Call the correct delete function
      Swal.fire('سەرکەوتوو!', ' دەیتاکەت سریەوە.', 'success');
      fetchInvoices(); // Refresh the invoice list
      fetchUsers(); // Refresh the user list if needed
    } catch (error) {
      Swal.fire('هەڵە!', 'ناتوانی بکەیتەوە: ' + error.message, 'error');
    }
  }
};


const clearForm = () => {
  invoiceForm.value = { id: null, price: 0, date: '', user_id: null };
  editing.value = false;
};

const nextPage = () => {
  currentPage.value++;
  fetchInvoices();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchInvoices();
  }
};

const showInvoice = (invoice) => {
  selectedInvoice.value = invoice;
  router.push({ name: 'print-invoices', params: { id: invoice.id } }); 
};
onMounted(() => {
  fetchInvoices();
  fetchUsers();
});
</script>



<style scoped>
.search-header {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1rem;
  font-family: Arial, sans-serif;
}

.admin-table th,
.admin-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.admin-table th {
  background-color: #4CAF50;
  color: white;
  text-transform: uppercase;
  font-size: 0.85rem;
}


.edit-button,
.delete-button ,
.download-button,.show-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}
.download-button {
  background-color: #28a745; 
  color: white;
}

.download-button:hover {
  background-color: #218838; 
}
.show-button {
  background-color: #ff911c; 
  color: white;
}

.show-button:hover {
  background-color: #ee9f18; 
}
.edit-button {
  background-color: #007BFF;
  color: white;
}

.edit-button:hover {
  background-color: #0056b3; 
}

.delete-button {
  background-color: #dc3545; 
  color: white;
}

.delete-button:hover {
  background-color: #c82333; 
}

/* Pagination Styles */
.pagination {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.pagination-button {
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff; 
  color: white;
  font-size: 0.9rem;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed; 
}

.pagination-button:hover:not(:disabled) {
  background-color: #0056b3; 
}

.pagination-info {
  margin: 0 10px;
  font-size: 1rem;
}
</style>
