import React from 'react'
import { useParams } from 'react-router-dom'

function CartPage({Location}) {
    const { id } = useParams();
    let qty = Location.search ? Number(Location.search.split('=')[1]) : 1
    console.log('qty :', qty)

    return (
        <div>
            Cart
        </div>
    )
}

export default CartPage
