document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("content").style.display = "block";
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
});

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}
// Login Function
function login() {
    const userId = document.getElementById("loginId").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    if (userId === "engispider" && password === "engispider") {
        if (userType === "Admin" || userType === "Staff") {
            alert("Login successful!");
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("content").style.display = "block";
        } else {
            alert("You don't have access!");
        }
    } else {
        alert("Wrong ID or Password!");
    }
}

// Customer Management Functions
let customers = [];

function addOrUpdateCustomer() {
    const id = document.getElementById("customerId").value;
    const name = document.getElementById("customerName").value;
    const contact = document.getElementById("customerContact").value;
    const address = document.getElementById("customerAddress").value;

    if (!name || !contact || !address) {
        alert("All fields are required.");
        return;
    }

    if (id) {
        customers[id] = { name, contact, address };
    } else {
        customers.push({ name, contact, address });
    }

    clearCustomerForm();
    displayCustomers();
}

function clearCustomerForm() {
    document.getElementById("customerId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("customerContact").value = "";
    document.getElementById("customerAddress").value = "";
}

function displayCustomers() {
    const tableBody = document.querySelector("#customerTable tbody");
    tableBody.innerHTML = "";

    customers.forEach((customer, index) => {
        tableBody.innerHTML += `<tr>
            <td>${customer.name}</td>
            <td>${customer.contact}</td>
            <td>${customer.address}</td>
            <td>
                <button onclick="editCustomer(${index})">Edit</button>
                <button onclick="deleteCustomer(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

function editCustomer(index) {
    document.getElementById("customerId").value = index;
    document.getElementById("customerName").value = customers[index].name;
    document.getElementById("customerContact").value = customers[index].contact;
    document.getElementById("customerAddress").value = customers[index].address;
}

function deleteCustomer(index) {
    customers.splice(index, 1);
    displayCustomers();
}

function searchCustomer() {
    const searchTerm = document.getElementById("searchCustomer").value.toLowerCase();
    const tableBody = document.querySelector("#customerTable tbody");
    tableBody.innerHTML = "";

    customers.filter(customer => customer.name.toLowerCase().includes(searchTerm))
        .forEach((customer, index) => {
            tableBody.innerHTML += `<tr>
                <td>${customer.name}</td>
                <td>${customer.contact}</td>
                <td>${customer.address}</td>
                <td>
                    <button onclick="editCustomer(${index})">Edit</button>
                    <button onclick="deleteCustomer(${index})">Delete</button>
                </td>
            </tr>`;
        });
}

// Reports & Analytics
function toggleReport(reportId) {
    document.getElementById(reportId).classList.toggle("hidden");
}

function showReport(reportType) {
    const reportContent = document.getElementById("report-content");
    const reports = {
        "sales": "Select: Daily, Monthly, Yearly Reports",
        "daily": "Daily Sales Report: ₹50,000",
        "monthly": "Monthly Sales Report: ₹1,200,000",
        "yearly": "Yearly Sales Report: ₹14,400,000",
        "stock": "Select: Current Stock, Low Stock Reports",
        "current-stock": "Current Stock: 250 Items",
        "low-stock": "Low Stock Alert: 5 Items left",
        "customer": "Select: Recent Purchases, Top Customers",
        "recent-purchases": "Recent Purchases: John - ₹50,000",
        "top-customers": "Top Customers: Alice - ₹500,000"
    };

    reportContent.innerHTML = `<p>${reports[reportType] || "Report not available"}</p>`;
    reportContent.classList.remove("hidden");
}

function downloadReport() {
    const reportContent = document.getElementById("report-content").innerText;
    if (!reportContent) {
        alert("Please select a report to download.");
        return;
    }

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.txt";
    link.click();
}


