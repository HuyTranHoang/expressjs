$(document).ready(function () {
    $('.delete-product').on('click', function () {
        const productId = $(this).data('id')
        const button = $(this)
        Swal.fire({
            title: 'Are you sure want to delete product?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'POST',
                    url: `/admin/product/delete/${productId}`,
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Product deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        button.closest('.product-item').remove()
                    },
                    error: function (error) {
                        console.error('Error deleting product:', error)
                    }
                })
            }
        })
    })
})