import Swal from 'sweetalert2';

const handleResult = (result) => {
  if (result.value) {
    window.location.reload();
  } else {
    document.querySelectorAll('.cell').forEach((cell) => {
      const cellClone = cell.cloneNode(true);
      cell.parentNode.replaceChild(cellClone, cell);
    });
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: true
    });
    Toast.fire({
      type: 'question',
      title: 'Play a new game?'
    }).then((confirm) => {
      if (confirm.value) {
        window.location.reload();
      }
    });
  }
};

const loseAlert = () => {
  Swal.fire({
    type: 'error',
    title: 'You lost',
    text: 'Play another game?',
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#BDBDBD',
    confirmButtonText: 'Start game',
    cancelButtonText: 'Show board'
  }).then(result => handleResult(result));
};

const winAlert = () => {
  Swal.fire({
    type: 'success',
    title: 'You won!',
    text: 'Play another game?',
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: '#BDBDBD',
    confirmButtonText: 'Start game',
    cancelButtonText: 'Show board'
  }).then(result => handleResult(result));
};

export { loseAlert, winAlert };
