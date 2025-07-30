// InventoryForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from 'xlsx';

export default function InventoryForm({ edit = false, passOn = false }) {
    const { id } = useParams();
    const [bulkData, setBulkData] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        user: "",
        employeeCode: "",
        department: "",
        designation: "",
        assetCode: "",
        category: "",
        itemBrand: "",
        itemSpecification: "",
        modelNo: "",
        serialNo: "",
        purchaseDate: ""
    });

    useEffect(() => {
        if (edit || passOn) {
            axios.get("http://localhost:5000/api/inventory")
                .then(res => {
                    const item = res.data.find(i => i._id === id);
                    if (item) {
                        setForm({
                            user: item.currentHolder || "",
                            employeeCode: item.employeeCode || "",
                            department: item.department || "",
                            designation: item.designation || "",
                            assetCode: item.assetCode || "",
                            category: item.category || "",
                            itemBrand: item.itemBrand || "",
                            itemSpecification: item.itemSpecification || "",
                            modelNo: item.modelNo || "",
                            serialNo: item.serialNo || "",
                            purchaseDate: item.purchaseDate?.slice(0, 10) || ""
                        });
                    }
                });
        }
    }, [edit, passOn, id]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (edit) {
            axios.put(`http://localhost:5000/api/inventory/${id}`, form)
                .then(() => navigate("/"));
        } else if (passOn) {
            axios.post(`http://localhost:5000/api/inventory/passon/${id}`, {
                newUser: form.user, newEmployeeCode: form.employeeCode
            }).then(() => navigate("/"));
        } else {
            axios.post("http://localhost:5000/api/inventory", {
                ...form,
                currentHolder: form.user
            }).then(() => navigate("/"));
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);

            console.log("Parsed Excel JSON:", json); // 🔍 Check this in browser dev tools

            try {
                axios.post(`http://localhost:5000/api/inventory/bulk`, json);
                alert("Bulk upload successful");
                window.location.reload();
            } catch (error) {
                console.error("Bulk upload failed:", error);
                alert("Bulk upload failed");
            }
        };

        reader.readAsArrayBuffer(file);
    };


    const confirmImport = async () => {
        try {
            // Send data to the backend
            await axios.post("http://localhost:5000/api/inventory/bulk", bulkData);
            alert("Inventory imported successfully!");

            // Refresh inventory list
            const res = await axios.get("http://localhost:5000/api/inventory");
            setItems(res.data);

            setShowPreview(false);
            setBulkData([]);
        } catch (err) {
            console.error("Bulk import failed:", err);
            alert("Failed to import inventory.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">

            <div className="flex justify-end items-center mb-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-sky-500 text-white px-3 py-2 rounded hover:bg-sky-600 transition duration-200 hover:scale-105"
                >
                    Dashboard
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 transition-all duration-300 bg-sky-200 p-6 rounded shadow-md">
                <div className="my-4 flex bg-sky-50 py-3 px-4 rounded shadow-md space-x-4 items-center w-fit">
                    <label className="text font-medium">Upload Inventory Excel</label>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="file-input file-input-bordered py-2 px-3 rounded w-fit bg-sky-500 text-white" />
                </div>
<hr className="text-sky-800"/>
                {showPreview && (
                    <div className="bg-white p-4 rounded shadow mt-4">
                        <h2 className="text-lg font-semibold mb-2">Preview Bulk Import</h2>
                        <div className="overflow-auto max-h-64">
                            <table className="table-auto w-full text-sm text-left border">
                                <thead>
                                    <tr>
                                        {Object.keys(bulkData[0] || {}).map((key, idx) => (
                                            <th key={idx} className="border px-2 py-1 bg-gray-100">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bulkData.map((item, idx) => (
                                        <tr key={idx}>
                                            {Object.values(item).map((val, i) => (
                                                <td key={i} className="border px-2 py-1">{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex gap-2 mt-3">
                            <button onClick={confirmImport} className="btn btn-sm bg-green-500 text-white">Confirm Import</button>
                            <button onClick={() => setShowPreview(false)} className="btn btn-sm bg-red-500 text-white">Cancel</button>
                        </div>
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-6">
                    {edit ? "Edit Inventory" : passOn ? "Pass On Inventory" : "➕ Add Inventory"}
                </h2>
                <p className="border-b border-sky-50 py-1">Item Description</p>
                <div>
                    <label className="block mb-1 font-medium">User Name</label>
                    <input
                        name="user"
                        value={form.user}
                        onChange={handleChange}
                        className="w-full bg-sky-50 rounded px-3 py-2 shadow-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Employee Code</label>
                    <input
                        name="employeeCode"
                        value={form.employeeCode}
                        onChange={handleChange}
                        className="w-full bg-sky-50 rounded px-3 py-2 shadow-sm"
                        required
                    />
                </div>

                {!passOn && (
                    <>
                        <div>
                            <label className="block mb-1 font-medium">Department</label>
                            <input
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                className="w-full bg-sky-50 rounded px-3 py-2 shadow-sm"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Designation</label>
                            <input
                                name="designation"
                                value={form.designation}
                                onChange={handleChange}
                                className="w-full bg-sky-50 rounded px-3 py-2 shadow-sm"
                            />
                        </div>
                        <p className="border-b border-sky-50 py-1">Item Description</p>
                        <div className="div_category flex space-x-4 items-center grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Asset Code</label>
                                <input
                                    name="assetCode"
                                    value={form.assetCode}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className=" block mb-1 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                    required
                                >
                                    <option value="Laptop">Laptop</option>
                                    <option value="Desktop">Desktop</option>
                                    <option value="Mouse">Mouse</option>
                                    <option value="Keyboard">Keyboard</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Item Brand</label>
                                <input
                                    name="itemBrand"
                                    value={form.itemBrand}
                                    onChange={handleChange}
                                    className="w-full bg-sky-50 rounded px-3 py-2 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Item Specification</label>
                                <input
                                    name="itemSpecification"
                                    value={form.itemSpecification}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Model No.</label>
                                <input
                                    name="modelNo"
                                    value={form.modelNo}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Serial No.</label>
                                <input
                                    name="serialNo"
                                    value={form.serialNo}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Purchase Date</label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    value={form.purchaseDate}
                                    onChange={handleChange}
                                    className="w-fit bg-sky-50 rounded px-3 py-2 shadow-sm"
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    className="bg-green-600 text-white drop-shadow-md px-4 py-2 rounded hover:bg-green-700"
                >
                    {edit ? "Update" : passOn ? "Transfer" : "Add"}
                </button>
            </form>
        </div>
    );
}
