import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OrderCreate.module.scss";

const OrderCreate = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    axios
      .get("https://localhost:7091/api/products/active") // Đặt đường dẫn đến API của bạn
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Thêm sản phẩm vào đơn hàng
  const addItemToOrder = (product) => {
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
          productCode: product.productCode,
        },
      ]);
    }
  };

  const removeItemFromOrder = (productId) => {
    setSelectedItems(
      selectedItems.filter((item) => item.productId !== productId)
    );
  };

  // Xử lý gửi đơn hàng
  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      customerName,
      customerPhone,
      items: selectedItems,
    };
    axios
      .post("https://localhost:7091/api/orders", orderData)
      .then((response) => {
        alert("đơn hàng đã khởi tạo thành công");
        setCustomerName("");
        setCustomerPhone("");
        setSelectedItems([]);
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  return (
    <div className={styles.container}>
    <h2 style={{color: '#6C7ADF'}}>Tạo đơn hàng</h2>
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
            <label>Tên khách hàng:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Số điện thoại:</label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
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
                const selectedProduct = products.find(
                  (product) => product.id === item.productId
                );
                return (
                  <tr key={index} className={styles.selectedProductRow}>
                    <td>{selectedProduct?.productCode}</td>
                    <td>{selectedProduct?.productName}</td>
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

          <button style={{marginTop:'20px',backgroundColor: '#6C7ADF',}} type="submit">Tạo đơn hàng</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default OrderCreate;
