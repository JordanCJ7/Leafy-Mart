import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal.mixin({
  customClass: {
    popup: 'swal-popup',
    title: 'swal-title',
    content: 'swal-content',
    confirmButton: 'swal-confirm',
    cancelButton: 'swal-cancel'
  },
  buttonsStyling: false,
  showClass: {
    popup: 'swal2-show'
  }
}));

// Choose theme based on system preference
const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const baseOptions = {
  background: prefersDark ? '#1f2937' : '#ffffff',
  color: prefersDark ? '#e5e7eb' : '#111827',
  confirmButtonColor: '#16a34a',
  cancelButtonColor: prefersDark ? '#374151' : '#9ca3af'
};

export function toast({ title, icon = 'success', timer = 2000 }) {
  return MySwal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer,
    icon,
    title,
    ...baseOptions
  });
}

export function alert(title, text) {
  return MySwal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'OK',
    ...baseOptions
  });
}

export function success(title, text) {
  return MySwal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    ...baseOptions
  });
}

export function error(title, text) {
  return MySwal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    ...baseOptions
  });
}

export function confirm(title, text, confirmButtonText = 'Yes', cancelButtonText = 'Cancel') {
  return MySwal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    ...baseOptions
  }).then(result => !!result.isConfirmed);
}

export default MySwal;
