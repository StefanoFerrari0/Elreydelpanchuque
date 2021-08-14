export default function validateInfo(values) {
    let errors = {};
  
    if (!values.name.trim()) {
      errors.name = 'El campo nombre es requerido';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'El campo Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Inserte un email válido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
  
    if (!values.password2) {
      errors.password2 = 'La contraseña es requerida';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Las contraseñas no coinciden.';
    }
    return errors;
  }