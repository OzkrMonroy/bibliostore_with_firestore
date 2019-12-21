import Swal from "sweetalert2";

export function successAlert(title = 'Good job!', text = 'You clicked the button!') {
  return Swal.fire(
    title,
    text,
    'success'
  )
}

export function confirmAlert(title = 'Are you sure?', text = "You won't be able to revert this!", confirmButtonText = 'Yes, delete it!', cancelButtonText = 'Cancel', confirmButtonColor = '#3085d6', cancelButtonColor = '#d33', icon = 'warning') {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText
  })
}