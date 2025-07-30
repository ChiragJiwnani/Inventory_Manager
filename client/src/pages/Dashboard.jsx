
// // Dashboard.jsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";


// export default function Dashboard() {

//     const [historyItem, setHistoryItem] = useState(null);
//     const [search, setSearch] = useState("");
//     const [filterField, setFilterField] = useState("user");
//     const [sortField, setSortField] = useState("");
//     const [items, setItems] = useState([]);
//     const [sortDirection, setSortDirection] = useState("asc");

//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get("http://localhost:5000/api/inventory").then((res) => setItems(res.data));
//     }, []);

//     const closeModal = () => setHistoryItem(null);

//     const filteredItems = items
//         .filter((item) =>
//             item[filterField]?.toLowerCase().includes(search.toLowerCase())
//         )
//         .sort((a, b) => {
//             if (!sortField) return 0;
//             const valA = a[sortField]?.toString().toLowerCase();
//             const valB = b[sortField]?.toString().toLowerCase();
//             if (valA < valB) return sortDirection === "asc" ? -1 : 1;
//             if (valA > valB) return sortDirection === "asc" ? 1 : -1;
//             return 0;
//         });

//     const handleSort = (field) => {
//         if (sortField === field) {
//             setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//         } else {
//             setSortField(field);
//             setSortDirection("asc");
//         }
//     };

//     const clearFilters = () => {
//         setSearch("");
//         setFilterField("user");
//         setSortField("");
//         setSortDirection("asc");
//     };

//     const columns = [
//         { label: "User Name", key: "currentHolder" },
//         { label: "Employee Code", key: "employeeCode" },
//         { label: "Department", key: "department" },
//         { label: "Designation", key: "designation" },
//         { label: "Asset Code", key: "assetCode" },
//         { label: "Category", key: "category" },
//         { label: "Item Brand", key: "itemBrand" },
//         { label: "Item Specification", key: "itemSpecification" },
//         { label: "Model No.", key: "modelNo" },
//         { label: "Serial No.", key: "serialNo" },
//         { label: "Purchase Date", key: "purchaseDate" },
//     ];




//     return (
//         <>
//             <h1 className="text-5xl font-bold my-10 justify-center flex text-yellow-600">
//                 Inventory Dashboard
//             </h1>




//             <div className="flex justify-between mb-6">
//                 <div className="flex items-center space-x-2">
//                     <select
//                         value={filterField}
//                         onChange={(e) => setFilterField(e.target.value)}
//                         className="px-2 py-1 rounded border"
//                     >
//                         {columns.map((col) => (
//                             <option key={col.key} value={col.key}>
//                                 {col.label}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="px-3 py-1 rounded border"
//                     />
//                     <button
//                         onClick={clearFilters}
//                         className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
//                     >
//                         Clear
//                     </button>
//                 </div>
//                 <Link
//                     to="/add"
//                     className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition duration-200"
//                 >
//                     Add Inventory
//                 </Link>
//             </div>

//             <div className=" bg-sky-50 rounded-lg shadow-md pt-6">
//                 <div className="overflow-x-auto overflow-y-auto max-h-[70vh] pr-1">
//                     <table className="min-w-full text-center border-collapse rounded shadow-md">
//                         <thead className="">
//                             <tr className="border-b border-gray-300">
//                                 <th className="text-left"></th>
//                                 {columns.map((col) => (
//                                     <th
//                                         key={col.key}
//                                         onClick={() => handleSort(col.key)}
//                                         className="px-4 py-4 cursor-pointer rounded hover:text-blue-500"
//                                     >
//                                         {col.label}
//                                         {sortField === col.key && (sortDirection === "asc" ? " ▲" : " ▼")}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody >
//                             {filteredItems.map((item, index) => (
//                                 <tr
//                                     key={item._id}
//                                     className="hover:bg-sky-100 transition duration-200"
//                                 >
//                                     <td className="px-1 py-1 text-gray-400">{index + 1}</td>
//                                     <td
//                                         className="py-2 px-4 cursor-pointer rounded hover:bg-blue-300"
//                                         onClick={() => setHistoryItem(item)}
//                                     >
//                                         {item.currentHolder}
//                                     </td>
//                                     <td className="py-2 px-4">{item.employeeCode}</td>
//                                     <td className="py-2 px-4">{item.department}</td>
//                                     <td className="py-2 px-4">{item.designation}</td>
//                                     <td className="py-2 px-4">{item.assetCode}</td>
//                                     <td className="py-2 px-4">{item.category}</td>
//                                     <td className="py-2 px-4">{item.itemBrand}</td>
//                                     <td className="py-2 px-4">{item.itemSpecification}</td>
//                                     <td className="py-2 px-4">{item.modelNo}</td>
//                                     <td className="py-2 px-4">{item.serialNo}</td>
//                                     <td className="py-2 px-4">
//                                         {new Date(item.purchaseDate).toLocaleDateString()}
//                                     </td>

//                                     <div className="px-2 py-2 flex space-x-2 justify-end bg-sky-50">
//                                         <button
//                                             onClick={() => navigate(`/edit/${item._id}`)}
//                                             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200 hover:scale-105"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             onClick={() => navigate(`/passon/${item._id}`)}
//                                             className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 hover:scale-105"
//                                         >
//                                             Pass
//                                         </button>
//                                     </div>

//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {historyItem && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
//                         <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
//                             <h3 className="text-lg font-bold mb-4">
//                                 Transfer History for <span className="text-blue-600">{historyItem.serialNo}</span>
//                             </h3>
//                             <ul className="space-y-2 max-h-60 overflow-y-auto">
//                                 {historyItem.history?.length > 0 ? (
//                                     historyItem.history.map((h, idx) => (
//                                         <li
//                                             key={idx}
//                                             className="text-gray-800 flex items-center justify-between"
//                                         >
//                                             <span>
//                                                 🔁 {h.user} {h.employeeCode && (<span className="text-sm">({h.employeeCode})</span>)}
//                                             </span>
//                                             <span className="text-sm text-gray-600">
//                                                 {new Date(h.date).toLocaleDateString()}
//                                             </span>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <li>No transfer history yet.</li>
//                                 )}
//                             </ul>
//                             <button
//                                 onClick={closeModal}
//                                 className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }


// Dashboard.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [historyItem, setHistoryItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("user");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const navigate = useNavigate();
  const { token, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        }
      });
  }, [token, navigate, logout]);

  const closeModal = () => setHistoryItem(null);

  const filteredItems = items
    .filter((item) =>
      item[filterField]?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valA = a[sortField]?.toString().toLowerCase();
      const valB = b[sortField]?.toString().toLowerCase();
      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setFilterField("user");
    setSortField("");
    setSortDirection("asc");
  };

  const columns = [
    { label: "User Name", key: "currentHolder" },
    { label: "Employee Code", key: "employeeCode" },
    { label: "Department", key: "department" },
    { label: "Designation", key: "designation" },
    { label: "Asset Code", key: "assetCode" },
    { label: "Category", key: "category" },
    { label: "Item Brand", key: "itemBrand" },
    { label: "Item Specification", key: "itemSpecification" },
    { label: "Model No.", key: "modelNo" },
    { label: "Serial No.", key: "serialNo" },
    { label: "Purchase Date", key: "purchaseDate" },
  ];

  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-2">
        <h1 className="text-5xl font-bold text-sky-600 my-10" >Inventory Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="px-2 py-1 rounded bg-sky-100 text-sky-800"
          >
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded bg-sky-100 text-sky-800"
          />
          <button
            onClick={clearFilters}
            className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-700 transition"
          >
            Clear
          </button>
        </div>
        <Link
          to="/add"
          className="bg-sky-500 text-white px-3 py-2 rounded hover:bg-sky-600 transition duration-200"
        >
          Add Inventory
        </Link>
      </div>

      {/* Inventory Table */}
      <div className=" bg-sky-50 rounded-lg shadow-md ">
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] pr-1">
          <table className="min-w-full text-center border-collapse rounded shadow-md">
            <thead>
              <tr className="border-b border-gray-300 sticky top-0 bg-sky-100">
                
                <th className="text-left"></th>
                
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-4 cursor-pointer rounded hover:text-blue-500"
                  >
                    {col.label}
                    {sortField === col.key && (sortDirection === "asc" ? " ▲" : " ▼")}
                  </th>
                ))}
       
              </tr>
            </thead>
            
            <tbody>
              {filteredItems.map((item, index) => (
                
                <tr key={item._id} className="text-sky-800 hover:bg-sky-100 transition duration-200">
                  <td className="px-1 py-1 text-gray-400">{index + 1}</td>
                  <td
                    className="py-2 px-4 cursor-pointer rounded hover:bg-blue-300"
                    onClick={() => setHistoryItem(item)}
                  >
                    {item.currentHolder}
                  </td>
                  <td className="py-2 px-4">{item.employeeCode}</td>
                  <td className="py-2 px-4">{item.department}</td>
                  <td className="py-2 px-4">{item.designation}</td>
                  <td className="py-2 px-4">{item.assetCode}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4">{item.itemBrand}</td>
                  <td className="py-2 px-4">{item.itemSpecification}</td>
                  <td className="py-2 px-4">{item.modelNo}</td>
                  <td className="py-2 px-4">{item.serialNo}</td>
                  <td className="py-2 px-4">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-4 flex space-x-2 justify-end bg-sky-50 items-center">
                    <button
                      onClick={() => navigate(`/edit/${item._id}`)}
                      className="justify bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200 hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/passon/${item._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 hover:scale-105"
                    >
                      Pass
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Transfer History Modal */}
        {historyItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">
                Transfer History for <span className="text-blue-600">{historyItem.serialNo}</span>
              </h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {historyItem.history?.length > 0 ? (
                  historyItem.history.map((h, idx) => (
                    <li
                      key={idx}
                      className="text-gray-800 flex items-center justify-between"
                    >
                      <span>
                        🔁 {h.user}{" "}
                        {h.employeeCode && (
                          <span className="text-sm">({h.employeeCode})</span>
                        )}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(h.date).toLocaleDateString()}
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No transfer history yet.</li>
                )}
              </ul>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
