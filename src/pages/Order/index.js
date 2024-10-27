import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Order.module.scss'; 
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7091/api/orders');
                console.log(response.data)

                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
      <div className={cx("order-list")}>
        <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Danh Sách Đơn Hàng</h2>
          <Link to="/orders/create-order">
            <button style={{backgroundColor: '#6C7ADF'}} className={cx("btn-create")}>
              Thêm mới
            </button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Mã Đơn Hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Tổng Số Tiền</th>
              <th>Số Tiền Thuế</th>
              <th>Ngày Tạo</th>
              <th>Ngày Cập Nhật</th>
              <th>Mã Mặt Hàng</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderCode}</td>
                <td>{order.customerName}</td>
                <td>{order.customerPhone}</td>
                <td>{order.totalAmount}</td>
                <td>{order.taxAmountOrder}</td>
                <td>{new Date(order.createdDate).toLocaleDateString()}</td>
                <td>
                  {order.updatedDate !== "0001-01-01T00:00:00"
                    ? new Date(order.updatedDate).toLocaleDateString()
                    : ""}
                </td>
                <td>
                  {order.items
                    .map((item) => (
                      <span key={item.productId}>{item.productCode}</span>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </td>
                <td>
                  <Link to={`/orders/${order.id}`}>
                    <button className={cx("action-button")}>
                      <FaEdit /> Chi tiết
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default OrderList;
