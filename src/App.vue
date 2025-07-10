<script setup>
import { ref, reactive, computed, watch } from "vue";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// 固定地址，作為 Bill to
const billTo = ref("Sellery LTD (Company No.: 1553171) Address: 19-21 Great Tower Street, London EC3R5AQ, United Kingdom");

// Payment To 下拉選單
const paymentTo = ref("Adem");

// Payment Mapping 預設資料 (Adem 與 May 的樣本)
const paymentMapping = reactive({
  Adem: { bank: "Revolut", account: "16431952", sortCode: "04-29-09", bankName: "Yi Wei Chen" },
  Andrea: { bank: "Monzo Bank", account: "18633142", sortCode: "04-00-04", bankName: "Andrea Medrano Puertas" },
  Danqi: { bank: "Lloyds", account: "41246063", sortCode: "30-95-42", bankName: "Danqi Zhao" },
  Geo: { bank: "Lloyds Bank", account: "17766060", sortCode: "30-80-33", bankName: "Georgia K Ker" },
  Hannah: { bank: "Halifax", account: "10987368", sortCode: "110039", bankName: "Hannah Musselwhite" },
  JC: { bank: "Lloyds", account: "56434868", sortCode: "77-77-52", bankName: "Jiacheng Chen" },
  Kate: { bank: "Barclays Bank", account: "73743306", sortCode: "20-27-94", bankName: "Kate Shortell" },
  Katie: { bank: "", account: "88006409", sortCode: "04-00-75", bankName: "Katie Waters" },
  Laura: { bank: "Santander", account: "90233146", sortCode: "09-01-27", bankName: "Laura King" },
  Elli: { bank: "Lloyds", account: "31261163", sortCode: "30-94-87", bankName: "Li Ai" },
  Melody: { bank: "Monzo", account: "22277235", sortCode: "04-00-04", bankName: "Liang Yu" },
  May: { bank: "Sample Bank B", account: "87654321", sortCode: "333444", bankName: "May" },
  Mehveet: { bank: "", account: "40937649", sortCode: "20-63-28", bankName: "Mehveet Jhaar" },
  Eljona: { bank: "Barclays", account: "40079022", sortCode: "20-72-33", bankName: "Miss Britney Murati" },
  Olive: { bank: "", account: "22586657", sortCode: "40-20-30", bankName: "Miss O J Cowap" },
  Ruby: { bank: "Lloyds Bank", account: "36596460", sortCode: "30-91-83", bankName: "Miss Ruby L Cross" },
  Mya: { bank: "", account: "13507661", sortCode: "11-07-96", bankName: "Mya Wolfenden" },
  Noemi: { bank: "Metro", account: "42588210", sortCode: "23-05-80", bankName: "Noemi Oberhauser" },
  Sabrina: { bank: "Barclays Bank", account: "53358291", sortCode: "20-73-53", bankName: "S PINNU" },
  Serena: { bank: "Monzo", account: "79124518", sortCode: "04-00-04", bankName: "Shugela Kunanbayi" },
  Veronica: { bank: "NatWest", account: "25824775", sortCode: "52-21-34", bankName: "Veronica Malka" },
  Verona: { bank: "Barclays Bank", account: "65747525", sortCode: "04-00-03", bankName: "Verona" },
  Zhang_Wang: { bank: "Lloyds", account: "44801863", sortCode: "30-97-90", bankName: "Wangyiyang Zhang" },
  Demetria: { bank: "Lloyds", account: "73603768", sortCode: "30-90-53", bankName: "Xingzi Lin" },
  Zineb: { bank: "", account: "43962077", sortCode: "04-00-04", bankName: "Zineb OUDAOUDI" },
  Ziyi: { bank: "Lloyds", account: "49833168", sortCode: "30-64-43", bankName: "Ziyi Dong" },
  Rui: { bank: "", account: "27149062", sortCode: "30-94-87", bankName: "Rui Zhang" },
  Betty: { bank: "Lloyds", account: "47165860", sortCode: "77-77-53", bankName: "SUNJIA HUO" },
  Lauren: { bank: "Lloyds", account: "10338449", sortCode: "60-83-71", bankName: "Lauren Taylor" },
  Bethany: { bank: "NatWest", account: "17119405", sortCode: "60-05-12", bankName: "BETHANY A PERRINS" },
  Callie: { bank: "Metro bank", account: "44923971", sortCode: "23-05-80", bankName: "MISS C M MOCOCK" },
  Phoebe: { bank: "NatWest", account: "46915621", sortCode: "60-13-12", bankName: "Phoebe A Q Lyons" },
  Fran: { bank: "NatWest Bank", account: "46651691", sortCode: "60-07-31", bankName: "Francesca Charlotte Harris" },
  Chloe: { bank: "HSBC UK BANK plc", account: "12849704", sortCode: "40-01-06", bankName: "Chloe Martinez" },
  Yoki: { bank: "", account: "71082078", sortCode: "40-03-40", bankName: "LIU SHICEN" },
  Sarah: { bank: "NatWest", account: "64923541", sortCode: "01-30-99", bankName: "Miss Sarah A Adesiyan" },
  Simone: { bank: "Halifax", account: "00718184", sortCode: "11-04-20", bankName: "Simone Mitev" },
  Joyce: { bank: "Monzo", account: "52100577", sortCode: "04-00-03", bankName: "Jiaying Ouyang" },
  Tex: { bank: "", account: "91928263", sortCode: "04-00-03", bankName: "Tex Zhang" },
  Tracy: { bank: "", account: "01377019", sortCode: "07-12-26", bankName: "Xiaoqian Xiong" },
  Siqi: { bank: "", account: "34263963", sortCode: "77-74-01", bankName: "Siqi Zhang" },
  Katherine: { bank: "", account: "74228498", sortCode: "60-83-71", bankName: "Meiyu Guo" },
  Hugo: { bank: "", account: "24438396", sortCode: "40-06-02", bankName: "Yu_Xiang_Zheng" },
  Sitong: { bank: "HSBC", account: "25131464", sortCode: "40-16-72", bankName: "Sitong Liu" },
  Olivia: { bank: "", account: "75551985", sortCode: "51-61-34", bankName: "Olivia Smith" },
  Oge: { bank: "Revolut", account: "21770899", sortCode: "23-01-20", bankName: "Ogechi Uzoigwe" },
  Tagi: { bank: "Barclays", account: "13832686", sortCode: "20-96-60", bankName: "Tagrid El-Oukaili" },
  Joe: { bank: "Monzo", account: "70180125", sortCode: "04-00-03", bankName: "Joseph King" },
  Masudah: { bank: "Barclays", account: "80899011", sortCode: "20-66-51", bankName: "MS KHATUN" },
  Holly: { bank: "Lloyds bank", account: "31930668", sortCode: "30-95-99", bankName: "Holly F Shepherd" },
  Filiz: { bank: "Lloyds", account: "13594559", sortCode: "04-00-75", bankName: "Filiz Gunther" },
  Cindy: { bank: "", account: "59382414", sortCode: "04-29-09", bankName: "Cindy Suyaa" },
  Emma: { bank: "Monzo", account: "96825423", sortCode: "04-00-04", bankName: "zoyaa wang" },
  Miya: { bank: "MONZO", account: "94890467", sortCode: "04-00-03", bankName: "Huilin Wang" }, // 新增 Yifan 的樣本
});

// 建立 Payment Data，可編輯的三個欄位，初始取自 mapping 的預設值
const paymentData = reactive({
  bank: paymentMapping[paymentTo.value].bank,
  account: paymentMapping[paymentTo.value].account,
  sortCode: paymentMapping[paymentTo.value].sortCode,
  bankName: paymentMapping[paymentTo.value].bankName // 新增 bankName
});

// 當 paymentTo 改變時，自動更新 paymentData 的值
const updatePaymentData = (key) => {
  const data = paymentMapping[key];
  paymentData.bank = data.bank;
  paymentData.account = data.account;
  paymentData.sortCode = data.sortCode;
  paymentData.bankName = data.bankName;
};

// 使用 watch 時調用函式
watch(paymentTo, (newVal) => {
  updatePaymentData(newVal);
});

// 新增帳戶的資料
const newAccount = reactive({
  key: "",
  bank: "",
  account: "",
  sortCode: "",
  bankName: ""
});

const accountFields = [
  { id: "key", label: "帳戶名稱", placeholder: "輸入帳戶名稱 (Key)" },
  { id: "bank", label: "銀行名稱", placeholder: "輸入銀行名稱" },
  { id: "account", label: "帳戶號碼", placeholder: "輸入帳戶號碼" },
  { id: "sortCode", label: "Sort Code", placeholder: "輸入 Sort Code" },
  { id: "bankName", label: "帳戶持有人名稱", placeholder: "輸入帳戶持有人名稱" }
];

const addAccount = async () => {
  // 檢查所有欄位是否皆有輸入
  const isFormValid = Object.values(newAccount).every((value) => value.trim() !== "");
  if (!isFormValid) {
    alert("請填寫所有欄位！");
    return;
  }

  try {
    // 發送 POST 請求到後台 /api/bank 並等待回應
    const response = await fetch("https://pdfin-production.up.railway.app/api/bank", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newAccount)
  });

    if (!response.ok) {
      throw new Error("伺服器回應錯誤");
    }
    const result = await response.json();
    console.log("Server response:", result);

    // 若後台回應成功，則更新 paymentMapping
    paymentMapping[newAccount.key] = {
      bank: newAccount.bank,
      account: newAccount.account,
      sortCode: newAccount.sortCode,
      bankName: newAccount.bankName
    };

    // 更新 Payment To 下拉選單，選擇新帳戶
    paymentTo.value = newAccount.key;

    // 清空輸入欄位
    newAccount.key = "";
    newAccount.bank = "";
    newAccount.account = "";
    newAccount.sortCode = "";
    newAccount.bankName = "";

    alert("帳戶已成功新增並保存到後台！");
  } catch (error) {
    console.error("Error saving account to server:", error);
    alert("帳戶新增失敗，請稍後再試！");
  }
};

// 輸入欄位
const dateInput = ref(new Date().toISOString().slice(0, 10));
const projectName = ref("Payment for");

// Invoice Number（以目前日期與時間顯示）
const invoiceNumber = computed(() => {
  const d = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
});

// 用以產生 PDF 預覽的 data URI
const pdfPreview = ref("");

// 根據日期取得星期幾
const getWeekday = (dateStr) => {
  const dateObj = new Date(dateStr);
  return dateObj.toLocaleDateString("en-US", { weekday: "long" });
};

/* Invoice Items 表格相關 */
// 移除自動計算，改由使用者自行輸入 Total
const invoiceItems = ref([
  { no: "", description: "", hours: 0, rate: 0, total: 0 }
]);

// 原先以 hours*rate 自動計算的函式已不需要
// const calcItemTotal = (item) => {
//   item.total = item.hours * item.rate;
// };

const addInvoiceItem = () => {
  invoiceItems.value.push({ no: "", description: "", hours: 0, rate: 0, total: 0 });
};

// 計算所有項目的 Subtotal（以使用者輸入的 total 為準）
const subTotal = computed(() =>
  invoiceItems.value.reduce((acc, item) => acc + Number(item.total || 0), 0)
);

const generatePDF = () => {
  const doc = new jsPDF();

  // 標題：Invoice + Payment To 名稱
  doc.setFontSize(25);
  doc.text(`Invoice_${projectName.value}_${paymentTo.value}`, 10, 10);

  // 顯示 Invoice Number
  doc.setFontSize(15);
  doc.text(`Invoice Number : ${invoiceNumber.value}`, 10, 18);

  // 顯示日期與專案名稱
  let yPos = 28;
  doc.setFontSize(15);
  doc.text(`Date : ${dateInput.value}`, 10, yPos);
  yPos += 10;
  doc.text(`Project Name : ${projectName.value}`, 10, yPos);
  yPos += 10;

  // 產生 Invoice Items 表格，將 startY 加上 40（移到表格頭部下方）
  autoTable(doc, {
    startY: yPos + 80,
    head: [["NO.", "Description", "Hours", "Rate/Hour", "Total Amount"]],
    body: [
      ...invoiceItems.value.map((item, index) => [
        index + 1,
        item.description,
        item.hours,
        item.rate,
        item.total
      ]),
      ["", "", "", "Subtotal", subTotal.value.toFixed(2)]
    ],
    styles: {
      cellPadding: 8,
      fontSize: 12,
      halign: "center",
      valign: "middle",
      lineWidth: 0.5,
    },
    theme: "grid",
    headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] }
  });

  // 取得 Invoice Items 表格結束後的位置（不再額外加 20）
  const finalY = doc.previousAutoTable ? doc.previousAutoTable.finalY : yPos;

  // 自動換行長文字
  const billToText = doc.splitTextToSize(`Bill To : ${billTo.value}`, 180);
  doc.text(billToText, 10, finalY + 10);

  const paymentToText = doc.splitTextToSize(`Payment To : ${paymentTo.value}`, 180);
  doc.text(paymentToText, 10, finalY + 10 + (billToText.length * 6) + 10);

  // 計算 Payment To 區塊的高度後，設定 Bank Detail 區塊的起始位置
  const paymentToBlockHeight = paymentToText.length * 6;
  const bankBoxY = finalY + 10 + (billToText.length * 6) + 10 + paymentToBlockHeight + 10;

  // 在 Bank Detail 前以大標題文字呈現
  doc.setFontSize(15);
  doc.text("Bank Detail :", 10, bankBoxY);

  // 準備銀行詳細訊息
  const bankDetails = [
    `Bank : ${paymentData.bank}`,
    `Name : ${paymentData.bankName}`,
    `Account Number : ${paymentData.account}`,
    `Sort Code : ${paymentData.sortCode}`
  ];
  doc.setFontSize(12);
  // 輸出銀行詳細資料，使用陣列可以自動換行
  doc.text(bankDetails, 15, bankBoxY + 10);

  // 繪製矩形框包住銀行詳細資料（調整框高）
  const boxHeight = bankDetails.length * 6 + 10;
  doc.rect(8, bankBoxY - 5, 195, boxHeight);

  return doc;
};

const exportPDF = () => {
  try {
    const doc = generatePDF();
    // 只取得日期中月份的縮寫（前 3 個英文字）、並轉為大寫
    const monthAbbr = new Date(dateInput.value)
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    // 檔名格式：MONTH_付款人.pdf，例如 "MAR_ADEM.pdf"
    const fileName = `Invoice_${projectName.value}_${paymentTo.value}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const previewPDF = () => {
  try {
    const doc = generatePDF();
    pdfPreview.value = doc.output("datauristring");
  } catch (error) {
    console.error("Error generating PDF preview:", error);
  }
};

const showAccountForm = ref(false); // 控制新增帳戶區塊的顯示與隱藏
</script>

<template>
  <div class="container">
    <!-- 輸入欄位 -->
    <div class="form-group">
      <label for="date">Date:</label>
      <input id="date" v-model="dateInput" type="date" />
    </div>
    <div class="form-group">
      <label for="projectName">Project Name:</label>
      <input id="projectName" v-model="projectName" type="text" />
    </div>
    <div class="form-group">
      <label for="billTo">Bill to:</label>
      <input id="billTo" v-model="billTo" type="text" readonly />
    </div>
    <div class="form-group">
      <label for="invoiceNumber">Invoice Number:</label>
      <input id="invoiceNumber" :value="invoiceNumber" type="text" readonly />
    </div>
    <div class="form-group">
      <label for="paymentTo">Payment To:</label>
      <select id="paymentTo" v-model="paymentTo">
        <option v-for="(data, key) in paymentMapping" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </div>
    <!-- Payment Info 區塊，可編輯 -->
    <div class="form-group">
  <label>Payment Info:</label>
  <div class="payment-info">
    <div>
      <label>Bank</label>
      <input type="text" v-model="paymentData.bank" placeholder="Bank" />
    </div>
    <div>
      <label>Bank Name</label>
      <input type="text" v-model="paymentData.bankName" placeholder="Bank Name" />
    </div>
    <div>
      <label>Account Number</label>
      <input type="text" v-model="paymentData.account" placeholder="Account Number" />
    </div>
    <div>
      <label>Sort Code</label>
      <input type="text" v-model="paymentData.sortCode" placeholder="Sort Code" />
    </div>
  </div>
</div>

    <!-- Invoice Items 輸入表格 -->
    <div class="invoice-item">
      <h3>Invoice Item</h3>
      <table>
        <thead>
          <tr>
            <th>NO.</th>
            <th>Description</th>
            <th>Hours</th>
            <th>Rate/Hour</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoiceItems" :key="index">
            <td>{{ index + 1 }}</td>
            <td>
              <input v-model="item.description" type="text" placeholder="Enter Description" />
            </td>
            <td>
              <input v-model.number="item.hours" type="number" placeholder="Hours" />
            </td>
            <td>
              <input v-model.number="item.rate" type="number" placeholder="Rate/Hour" />
            </td>
            <td>
              <input v-model.number="item.total" type="number" placeholder="Total Amount" />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 新增＋按鈕 -->
      <button class="btn" @click="addInvoiceItem">Add＋</button>
    </div>

    <div class="form-group account-form">
      <h3 @click="showAccountForm = !showAccountForm" class="toggle-header">
        臨時新增帳戶
        <span>{{ showAccountForm ? "▲" : "▼" }}</span>
      </h3>
      <div v-show="showAccountForm">
        <div v-for="field in accountFields" :key="field.id" class="form-row">
          <label :for="field.id">{{ field.label }}:</label>
          <input :id="field.id" v-model="newAccount[field.id]" type="text" :placeholder="field.placeholder" class="input" />
        </div>
        <button class="button" @click="addAccount">新增帳戶</button>
      </div>
    </div>

    <!-- 按鈕區 -->
    <div class="button-group">
      <button class="btn" @click="exportPDF">Download PDF</button>
      <button class="btn" @click="previewPDF">Preview PDF</button>
    </div>

    <!-- PDF 預覽區 -->
    <div v-if="pdfPreview" class="preview-area">
      <h3>PDF Preview:</h3>
      <iframe :src="pdfPreview" width="100%" height="500"></iframe>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #000;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}
/* Payment Info 區塊 */
.payment-info {
  display: flex;
  gap: 10px;
}
.payment-info input {
  flex: 1;
}
/* 美化 Invoice Item 表格 */
.invoice-item {
  margin-top: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.invoice-item h3 {
  margin-bottom: 15px;
  color: #000;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.invoice-item table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
.invoice-item th {
  background-color: #2e74e3;
  color: #fff;
  font-weight: 600;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.invoice-item td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.invoice-item tr {
  color: #000;
}
.invoice-item input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}
.invoice-item input:focus {
  border-color: #4CAF50;
  outline: none;
}
.button-group {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}
.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #45a049;
}
.preview-area {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}
.preview-area h3 {
  margin-bottom: 15px;
  color: #000;
}

.account-form {
  margin-top: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.account-form h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.account-form .toggle-header {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-form .toggle-header span {
  font-size: 14px;
  color: #666;
}

.account-form .form-row {
  margin-bottom: 15px;
}

.account-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.account-form input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.account-form input:focus {
  border-color: #4CAF50;
  outline: none;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #45a049;
}
</style>
``` 

