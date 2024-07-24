<template>
    <div class="container mt-4" style="max-width: 600px;">
      <div class="mb-4">
        <router-link :to="returnPath" class="btn btn-light mr-3">
          <i class="bi bi-arrow-left-circle"></i> Retour
        </router-link>
        <h3>{{ formTitle }}</h3>
      </div>
      <form @submit.prevent="">
        <div class="form-group mb-3" v-for="field in fields" :key="field.key">
          <label :for="field.key">{{ field.label }}</label>
          <input v-if="field.type !== 'select' && field.type !== 'textarea'" :type="field.type" class="form-control"
                 :id="field.key" v-model="formData[field.key]" :required="field.required">
          <select v-else-if="field.type === 'select'" class="form-control" :id="field.key" v-model="formData[field.key]" :required="field.required">
            <option disabled value="">{{ field.placeholder }}</option>
            <option v-for="option in field.options" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </select>
          <textarea v-else class="form-control" :id="field.key" v-model="formData[field.key]" :required="field.required"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mb-5">{{ buttonLabel }}</button>
      </form>
    </div>
</template>

<script>
export default {
props: {
    formTitle: String,
    fields: Array,
    formData: Object,
    returnPath: String,
    buttonLabel: String
},
methods: {
    submitForm() {
    this.$emit('submit', this.formData);
    }
}
};
</script>

<style scoped>
h3 {
 margin-left: 1rem;
 margin-bottom: 0;
}

.admin-header {
 margin-left: 1rem;
}
 </style>