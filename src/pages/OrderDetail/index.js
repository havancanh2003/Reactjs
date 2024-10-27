import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./OrderDetail.module.scss"; // Giả định bạn có file CSS riêng

function OrderDetail() {
  const { orderId } = useParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [order, setOrder] = useState({
    customerName: "",
    customerPhone: "",
    orderCode: "",
    totalAmount: 0,
    taxAmountOrder: 0,
    items: [],
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7091/api/orders/${orderId}`
        );
        setOrder(response.data);
        converseItemSelect(response.data.items);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", err);
      }
    };

    fetchOrder();
  }, [orderId]);
  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm (nếu cần)
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7091/api/products/active"
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  // Xóa sản phẩm khỏi đơn hàng
  const removeItemFromOrder = (productId) => {
    const updatedItems = order.items.filter(
      (item) => item.productId !== productId
    );
    setOrder({ ...order, items: updatedItems });
  };

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = (e) => {
    e.preventDefault();
    const hasInvalidItem = selectedItems.some(item => item.isDeleted || !item.isActive);

    if (hasInvalidItem) {
        alert('Có ít nhất một sản phẩm đã bị xóa hoặc không còn hoạt động.');
        return;
    }
    const orderItemChange = selectedItems.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));
    const body = {
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      totalAmount: 0,
      taxAmountOrder: 0,
      items: orderItemChange,
    };

    axios
      .put(`https://localhost:7091/api/orders/${orderId}`, body)
      .then(() => {
        alert("Cập nhật đơn hàng thành công");
        window.location.reload()
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật đơn hàng:", error);
      });
  };
  const converseItemSelect = async (orderItems) => {
    const promises = orderItems.map(async (i) => {
      try {
        const response = await axios.get(
          `https://localhost:7091/api/products/id/${i.productId}`
        );
        return {
          productId: response.data.id,
          quantity: i.quantity,
          productCode: response.data.productCode,
          productName: response.data.productName,
          isActive: response.data.isActive,
          isDeleted: response.data.isDeleted,
        };
      } catch (error) {
        console.error("Có lỗi khi lấy thông tin sản phẩm:", error);
        return null;
      }
    });

    const results = await Promise.all(promises); // Đợi tất cả promises hoàn thành
    const filteredResults = results.filter((item) => item !== null);
    setSelectedItems(filteredResults);
  };
  const addItemToOrder = (product) => {
    console.log(selectedItems)
    const existingItem = selectedItems.find(
      (item) => item.productId === product.id
    );
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        {
          productId: product.id,
          quantity: 1,
          productName: product.productName,
          productCode: product.productCode,
          isActive: true,
        },
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 style={{ color: "#6C7ADF" }}>Chi tiết đơn hàng</h2>
      <div className={styles.orderPage}>
        {/* Phần danh sách sản phẩm */}
        <div className={styles.productList}>
          <h2>Danh sách sản phẩm</h2>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <span>
                Mã: {product.productCode} - Tên: {product.productName} - Giá:{" "}
                {product.sellingPrice} {product.unit}
              </span>
              <button onClick={() => addItemToOrder(product)}>
                Thêm vào đơn hàng
              </button>
            </div>
          ))}
        </div>

        {/* Phần thông tin đơn hàng */}
        <div className={styles.orderForm}>
          <h2>Thông tin đơn hàng</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Mã đơn hàng:</label>
              <input
                type="text"
                style={{ backgroundColor: "#F1F2F3" }}
                value={order.orderCode}
                readOnly
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tên khách hàng:</label>
              <input
                type="text"
                value={order.customerName}
                onChange={(e) =>
                  setOrder((pre) => ({
                    ...pre,
                    customerName: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Số điện thoại:</label>
              <input
                type="text"
                value={order.customerPhone}
                onChange={(e) =>
                  setOrder((prevOrder) => ({
                    ...prevOrder,
                    customerPhone: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tổng đơn hàng:</label>
              <input
                type="text"
                style={{ backgroundColor: "#F1F2F3" }}
                value={order.totalAmount}
                readOnly
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tổng thuế:</label>
              <input
                type="text"
                style={{ backgroundColor: "#F1F2F3" }}
                value={order.taxAmountOrder}
                readOnly
                required
              />
            </div>

            <h3>Sản phẩm đã chọn:</h3>
            <table className={styles.selectedProductTable}>
              <thead>
                <tr>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((item, index) => {
                  const isRemoved = item.isDeleted || !item.isActive; // Kiểm tra xem sản phẩm đã bị xóa hoặc không hoạt động
                  return (
                    <tr key={index} className={styles.selectedProductRow}>
                      <td
                        style={{
                          textDecoration: isRemoved ? "line-through" : "none",
                        }}
                      >
                        {item.productCode}
                      </td>
                      <td
                        style={{
                          textDecoration: isRemoved ? "line-through" : "none",
                        }}
                      >
                        {item.productName}
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className={styles.removeButton}
                          onClick={() => removeItemFromOrder(item.productId)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            

            <button
              style={{ marginTop: "20px", backgroundColor: "#6C7ADF" }}
              type="submit"
            >
              Cập nhật đơn hàng
            </button>
          </form>
          <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              *Sản phẩm (VD: ̶P̶̶R̶̶0̶̶0̶̶0̶̶1̶ ) đã bị xóa hoặc ngưng hoạt động, hãy xóa
              khỏi sản phẩm đã chọn !!
            </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
