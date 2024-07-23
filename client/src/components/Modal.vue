<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <div v-if="loading">Chargement...</div>
            <div v-else-if="error">{{ errorMessage }}</div>
            <div v-else-if="success">{{ successMessage }}</div>
            <div v-else>
              <slot name="body">default body</slot>
            </div>
          </div>

          <div class="modal-footer" v-if="!loading && !success">
            <slot name="footer">
              <button class="btn btn-secondary" v-if="showCancelButton" @click="cancelAction">Annuler</button>
              <button class="btn btn-primary" @click="confirmOrClose">{{ confirmButtonText }}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    onConfirm: {
      type: Function,
      default: null
    },
    showCancelButton: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: 'Confirmer'
    },
    successMessage: {
      type: String,
      default: 'Opération réussie!'
    },
    errorMessage: {
      type: String,
      default: 'Une erreur est survenue'
    }
  },
  data() {
    return {
      loading: false,
      success: false,
      error: false,
    };
  },
  methods: {
    confirmAction() {
      this.loading = true;
      this.error = false;
      this.success = false;

      if (this.onConfirm) {
        this.onConfirm();
        this.closeModal();
      } else {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('close');
      this.resetModal();
    },
    cancelAction() {
      this.$emit('close');
      this.resetModal();
    },
    resetModal() {
      this.loading = false;
      this.success = false;
      this.error = false;
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 0.7rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.btn-secondary {
  margin-right: 1rem;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>