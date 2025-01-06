import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import AddUser from "../components/adminPages/AddUser";
import "./AdminDash.css"; // Optional for styling

const AdminDash = () => {
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedDriver, setSelectedDriver] = useState({}); // Track selected driver for each order

  // Fetch customers, users, and orders data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers
        const customersSnapshot = await getDocs(collection(db, "customers"));
        const customersData = customersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch users and categorize by role
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch orders
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCustomers(customersData);
        setAdmins(usersData.filter((user) => user.role === "admin"));
        setDrivers(usersData.filter((user) => user.role === "driver"));
        setEmployees(usersData.filter((user) => user.role === "employee"));
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignDriver = async (orderId) => {
    if (!selectedDriver[orderId]) {
      alert("Please select a driver.");
      return;
    }

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        assignedDriverId: selectedDriver[orderId],
      });

      // Update orders state locally to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, assignedDriverId: selectedDriver[orderId] }
            : order
        )
      );

      alert("Driver assigned successfully!");
    } catch (err) {
      console.error("Error assigning driver:", err);
      alert("Failed to assign driver. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdminDash">
      <h1>Admin Dashboard</h1>

      {/* Orders Table */}
      <h2>Orders</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Details</th>
            <th>Pickup Address</th>
            <th>Assigned Driver</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.orderDetails}</td>
              <td>{order.pickupAddress || "N/A"}</td>
              <td>
                {order.assignedDriverId ? (
                  drivers.find((d) => d.id === order.assignedDriverId)?.name ||
                  "Unknown Driver"
                ) : (
                  <select
                    value={selectedDriver[order.id] || ""}
                    onChange={(e) =>
                      setSelectedDriver({
                        ...selectedDriver,
                        [order.id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Driver</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>{order.createdAt?.toDate().toLocaleString()}</td>
              <td>
                {!order.assignedDriverId && (
                  <button
                    onClick={() => handleAssignDriver(order.id)}
                    style={{ padding: "0.5rem", cursor: "pointer" }}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customers Table */}
      <h2>Customers</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Admins Table */}
      <h2>Admins</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.phone}</td>
              <td>{admin.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drivers Table */}
      <h2>Drivers</h2>
      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Driver License</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr key={driver.id}>
              <td>{index + 1}</td>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.driverLicense || "N/A"}</td>
              <td>{driver.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Employees Table */}
      <h2>Employees</h2>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.createdAt?.toDate().toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowModal(true)} className="add-user-button">
        Add Employee
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              onClick={() => setShowModal(false)}
              className="close-modal-button"
            >
              X
            </button>
            <AddUser onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      <div className="full"></div>
    </div>
  );
};

export default AdminDash;
