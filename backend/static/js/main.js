// Archivo JavaScript principal de INIT

// Función para mostrar mensajes de alerta
function showAlert(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// Función para validar formularios
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  console.log('INIT - Aplicación cargada');
  
  // Configurar validación de formularios
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
        showAlert('Por favor completa todos los campos requeridos', 'error');
      }
    });
  });
});
