import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import AddUser from "../components/adminPages/AddUser";
import Sidebar from "../components/Sidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const tableRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch customers, users, and orders data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers
        const customersSnapshot = await getDocs(collection(db, "customers"));
        const customersData = customersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(), // Convert Firestore timestamp to Date object
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
          createdAt: doc.data().createdAt?.toDate(), // Convert Firestore timestamp to Date object
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

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const cols = table.querySelectorAll("th.resizable");
    cols.forEach((col) => {
      const resizer = document.createElement("div");
      resizer.className = "resizer";
      col.appendChild(resizer);
      resizer.addEventListener("mousedown", initResize);
    });

    function initResize(e) {
      const col = e.target.parentElement;
      const startX = e.clientX;
      const startWidth = col.offsetWidth;

      function doResize(e) {
        col.style.width = `${startWidth + e.clientX - startX}px`;
      }

      function stopResize() {
        document.removeEventListener("mousemove", doResize);
        document.removeEventListener("mouseup", stopResize);
      }

      document.addEventListener("mousemove", doResize);
      document.addEventListener("mouseup", stopResize);
    }
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdminDash">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setShowModal={setShowModal} />
      <div className={`content ${isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
        <h1>Admin Dashboard</h1>

        {/* Orders Table */}
        <h2>Orders</h2>
        <div className="table-container">
          <table ref={tableRef} border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th className="resizable sortable" onClick={() => handleSort('#')}>#</th>
                <th className="resizable sortable" onClick={() => handleSort('orderDetails')}>Order Details</th>
                <th className="resizable sortable" onClick={() => handleSort('pickupAddress')}>Pickup Address</th>
                <th className="resizable sortable" onClick={() => handleSort('assignedDriverId')}>Assigned Driver</th>
                <th className="resizable sortable" onClick={() => handleSort('createdAt')}>Created At</th>
                <th className="resizable">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData(orders).map((order, index) => (
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
                  <td>{order.createdAt?.toLocaleString()}</td>
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
        </div>

        {/* Customers Table */}
        <h2>Customers</h2>
        <div className="table-container">
          <table ref={tableRef} border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th className="resizable sortable" onClick={() => handleSort('#')}>#</th>
                <th className="resizable sortable" onClick={() => handleSort('displayName')}>Name</th>
                <th className="resizable sortable" onClick={() => handleSort('email')}>Email</th>
                <th className="resizable sortable" onClick={() => handleSort('phone')}>Phone</th>
                <th className="resizable sortable" onClick={() => handleSort('address')}>Address</th>
                <th className="resizable sortable" onClick={() => handleSort('createdAt')}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {sortedData(customers).map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.displayName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address || "N/A"}</td>
                  <td>{customer.createdAt?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Admins Table */}
        <h2>Admins</h2>
        <div className="table-container">
          <table ref={tableRef} border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th className="resizable sortable" onClick={() => handleSort('#')}>#</th>
                <th className="resizable sortable" onClick={() => handleSort('name')}>Name</th>
                <th className="resizable sortable" onClick={() => handleSort('email')}>Email</th>
                <th className="resizable sortable" onClick={() => handleSort('phone')}>Phone</th>
                <th className="resizable sortable" onClick={() => handleSort('createdAt')}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {sortedData(admins).map((admin, index) => (
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
        </div>

        {/* Drivers Table */}
        <h2>Drivers</h2>
        <div className="table-container">
          <table ref={tableRef} border="1" style={{ width: "100%", marginBottom: "20px" }}>
            <thead>
              <tr>
                <th className="resizable sortable" onClick={() => handleSort('#')}>#</th>
                <th className="resizable sortable" onClick={() => handleSort('name')}>Name</th>
                <th className="resizable sortable" onClick={() => handleSort('email')}>Email</th>
                <th className="resizable sortable" onClick={() => handleSort('phone')}>Phone</th>
                <th className="resizable sortable" onClick={() => handleSort('driverLicense')}>Driver License</th>
                <th className="resizable sortable" onClick={() => handleSort('createdAt')}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {sortedData(drivers).map((driver, index) => (
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
        </div>

        {/* Employees Table */}
        <h2>Employees</h2>
        <div className="table-container">
          <table ref={tableRef} border="1" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th className="resizable sortable" onClick={() => handleSort('#')}>#</th>
                <th className="resizable sortable" onClick={() => handleSort('name')}>Name</th>
                <th className="resizable sortable" onClick={() => handleSort('email')}>Email</th>
                <th className="resizable sortable" onClick={() => handleSort('phone')}>Phone</th>
                <th className="resizable sortable" onClick={() => handleSort('createdAt')}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {sortedData(employees).map((employee, index) => (
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
        </div>

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
      </div>
      <div className="full"></div>
    </div>
  );
};

export default AdminDash;