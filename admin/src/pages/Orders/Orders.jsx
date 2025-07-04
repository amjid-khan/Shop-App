import React from 'react'
import { IoPaperPlane } from 'react-icons/io5'
import "./Orders.css"
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import { FaBox } from "react-icons/fa";

const Orders = ({url}) => {
  const [order, setOrder] = useState([])
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrder(response.data.data)
    }
  }
  const statusHandler = async (e, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }
  useEffect(() => {
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className='order-item'>
            <FaBox style={{fontSize : "50px"}} className='img'/>

            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + " , "
                  }
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ", "}</p>
                <p>{ order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{ order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e)=>statusHandler(e, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
