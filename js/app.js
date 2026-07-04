// =============================================
// MAIN APPLICATION - BayarKita
// =============================================

import { 
    billData, 
    providerMapping, 
    providerData, 
    pulsaNominals, 
    paketData, 
    paymentMethods,
    getProviderFromNumber,
    getProviderData,
    getBill,
    getSppData
} from './data.js';

import {
    formatRupiah,
    formatDate,
    generateVA,
    getIconForType,
    getCategoryLabel,
    getCategoryIcon
} from './utils.js';

// =============================================
// STATE MANAGEMENT
// =============================================
let state = {
    currentPage: 'dashboard',
    currentCategory: 'pln',
    selectedMethod: null,
    currentBill: null,
    selectedNominal: '10000',
    selectedProvider: 'telkomsel',
    selectedPaket: null,
    selectedSppItems: [],
    sppData: null,
    saldo: 1250000,
    history: [],
    darkMode: false
};

export function loadState() {
    try {
        const saved = localStorage.getItem('bayarkita_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
        }
        const history = localStorage.getItem('bayarkita_history');
        if (history) {
            state.history = JSON.parse(history);
        }
        updateSaldoDisplay();
        updateBadge();
        updateDashboardStats();
    } catch (e) {
        console.warn('Failed to load state:', e);
    }
}

export function saveState() {
    try {
        const { history, ...stateToSave } = state;
        localStorage.setItem('bayarkita_state', JSON.stringify(stateToSave));
        localStorage.setItem('bayarkita_history', JSON.stringify(state.history));
        updateBadge();
        updateDashboardStats();
    } catch (e) {
        console.warn('Failed to save state:', e);
    }
}

// =============================================
// NAVIGATION
// =============================================
window.navigateTo = function(page) {
    state.currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');

    if (page === 'riwayat') renderHistory();
    if (page === 'dashboard') {
        renderRecentTransactions();
        updateDashboardStats();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// =============================================
// TOAST NOTIFICATION
// =============================================
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// =============================================
// MODAL
// =============================================
window.showModal = function(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalOverlay').classList.add('show');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.body.style.overflow = '';
};

document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// =============================================
// DASHBOARD
// =============================================
function updateSaldoDisplay() {
    document.getElementById('saldoDisplay').textContent = `Rp ${formatRupiah(state.saldo)}`;
}

function updateDashboardStats() {
    document.getElementById('totalTransaksi').textContent = state.history.length;
    let unpaid = 0;
    for (const category of ['pln', 'pdam', 'internet', 'seminar']) {
        for (const key in billData[category]) {
            if (billData[category][key].status === 'unpaid') unpaid++;
        }
    }
    document.getElementById('totalTagihan').textContent = unpaid;
}

window.topUpSaldo = function() {
    const amount = prompt('Masukkan nominal top up:', '100000');
    if (amount && !isNaN(amount) && parseInt(amount) > 0) {
        state.saldo += parseInt(amount);
        updateSaldoDisplay();
        saveState();
        showToast(`Saldo berhasil ditambah Rp ${formatRupiah(parseInt(amount))}`, 'success');
    }
};

function renderRecentTransactions() {
    const container = document.getElementById('recentTransactions');
    const recent = state.history.slice(-3).reverse();

    if (recent.length === 0) {
        container.innerHTML = `
            <div class="card text-center py-6">
                <i class="fas fa-inbox text-3xl text-gray-300 mb-2"></i>
                <p class="text-gray-500">Belum ada transaksi</p>
            </div>
        `;
        return;
    }

    container.innerHTML = recent.map(t => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <i class="fas ${getIconForType(t.type)}"></i>
                </div>
                <div>
                    <p class="font-medium text-sm">${t.title}</p>
                    <p class="text-xs text-gray-500">${t.date}</p>
                </div>
            </div>
            <span class="font-semibold text-emerald-600">-Rp ${formatRupiah(t.amount)}</span>
        </div>
    `).join('');
}

function updateBadge() {
    const badge = document.getElementById('historyBadge');
    if (state.history.length > 0) {
        badge.style.display = 'block';
        badge.textContent = state.history.length;
    } else {
        badge.style.display = 'none';
    }
}

window.toggleDarkMode = function() {
    state.darkMode = !state.darkMode;
    if (state.darkMode) {
        document.documentElement.classList.add('dark');
        document.getElementById('darkModeIcon').className = 'fas fa-sun';
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('darkModeIcon').className = 'fas fa-moon';
    }
    saveState();
};

window.showHelp = function() {
    showModal(`
        <div class="text-center mb-4">
            <i class="fas fa-headset text-4xl text-emerald-600 mb-2"></i>
            <h2 class="text-xl font-bold">Pusat Bantuan</h2>
        </div>
        <div class="space-y-3 text-sm">
            <div class="p-3 bg-gray-50 rounded-xl">
                <p class="font-semibold">📌 Cara Bayar Tagihan</p>
                <p class="text-gray-600">1. Pilih kategori tagihan<br>2. Masukkan nomor pelanggan<br>3. Klik "Cek Tagihan"<br>4. Pilih metode pembayaran<br>5. Klik "Bayar Sekarang"</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-xl">
                <p class="font-semibold">📌 Cara Isi Pulsa</p>
                <p class="text-gray-600">1. Pilih provider<br>2. Masukkan nomor HP<br>3. Pilih nominal pulsa<br>4. Klik "Beli Pulsa"</p>
            </div>
            <div class="p-3 bg-gray-50 rounded-xl">
                <p class="font-semibold">📌 Data Dummy</p>
                <p class="text-gray-600">PLN: 123456789012<br>PDAM: 678901234567<br>Internet: 901234567890<br>SPP: 202310001<br>Seminar: SEM-2026-001</p>
            </div>
        </div>
        <button class="btn-primary mt-4" onclick="closeModal()">Tutup</button>
    `);
};

// =============================================
// TAGIHAN
// =============================================
window.selectCategory = function(category) {
    state.currentCategory = category;

    document.querySelectorAll('#page-tagihan .service-item').forEach(el => {
        el.classList.remove('active-service');
    });
    document.querySelector(`#page-tagihan .service-item[data-category="${category}"]`)?.classList.add('active-service');

    const labels = {
        'pln': 'Nomor Pelanggan PLN (12 digit)',
        'pdam': 'Nomor Pelanggan PDAM (12 digit)',
        'internet': 'Nomor Pelanggan Internet (12 digit)',
        'seminar': 'Nomor Referensi Seminar (contoh: SEM-2026-001)'
    };
    document.getElementById('labelPelanggan').textContent = labels[category] || 'Nomor Pelanggan';

    document.getElementById('tagihanResult').classList.add('hidden');
    document.getElementById('inputPelanggan').value = '';
    document.getElementById('inputPelanggan').classList.remove('error');
    document.getElementById('pelangganError').classList.add('hidden');
};

window.cekTagihan = function() {
    const input = document.getElementById('inputPelanggan');
    const errorEl = document.getElementById('pelangganError');
    const value = input.value.trim();

    let isValid = true;
    let errorMsg = '';

    if (!value) {
        isValid = false;
        errorMsg = 'Nomor pelanggan harus diisi';
    } else if (state.currentCategory === 'seminar') {
        if (!/^SEM-2026-[0-9]{3}$/.test(value)) {
            isValid = false;
            errorMsg = 'Format seminar: SEM-2026-001';
        }
    } else {
        if (!/^\d{12}$/.test(value)) {
            isValid = false;
            errorMsg = 'Nomor pelanggan harus 12 digit angka';
        }
    }

    if (!isValid) {
        input.classList.add('error');
        errorEl.textContent = errorMsg;
        errorEl.classList.remove('hidden');
        return;
    }

    input.classList.remove('error');
    errorEl.classList.add('hidden');

    showToast('Mencari tagihan...', 'info');

    setTimeout(() => {
        const category = state.currentCategory;
        const data = billData[category];
        let bill = null;

        if (category === 'seminar') {
            bill = data[value] || null;
        } else {
            bill = data[value] || null;
        }

        if (!bill) {
            showToast('Nomor pelanggan tidak ditemukan', 'error');
            return;
        }

        state.currentBill = { ...bill, id: value, category };
        displayTagihanResult(bill);

    }, 1000);
};

function displayTagihanResult(bill) {
    document.getElementById('tagihanResult').classList.remove('hidden');
    document.getElementById('resultNama').textContent = bill.name;
    document.getElementById('resultAlamat').textContent = bill.address || '';
    document.getElementById('resultPeriode').textContent = bill.period;
    document.getElementById('resultJatuhTempo').textContent = formatDate(bill.due);
    document.getElementById('resultPokok').textContent = `Rp ${formatRupiah(bill.amount)}`;
    document.getElementById('resultDenda').textContent = bill.fine > 0 ? `Rp ${formatRupiah(bill.fine)}` : 'Tidak ada';
    document.getElementById('resultTotal').textContent = `Rp ${formatRupiah(bill.amount + bill.fine)}`;
    document.getElementById('resultStatus').textContent = bill.status === 'paid' ? '✓ Lunas' : 'Belum Lunas';
    document.getElementById('resultStatus').className = `badge ${bill.status === 'paid' ? 'badge-success' : 'badge-warning'}`;

    let extra = '';
    if (bill.daya) extra += `Daya: ${bill.daya} | `;
    if (bill.golongan) extra += `Golongan: ${bill.golongan} | `;
    if (bill.meter) extra += `Meter: ${bill.meter} | `;
    if (bill.usage) extra += `Pemakaian: ${bill.usage} | `;
    if (bill.package) extra += `Paket: ${bill.package} | `;
    if (bill.speaker) extra += `Speaker: ${bill.speaker}`;
    document.getElementById('resultExtra').textContent = extra;

    renderPaymentMethods();

    state.selectedMethod = null;
    document.getElementById('tagihanResult').scrollIntoView({ behavior: 'smooth' });
}

function renderPaymentMethods() {
    const container = document.getElementById('methodContainer');
    container.innerHTML = paymentMethods.map(m => `
        <div class="method-card" data-method="${m.id}" onclick="selectMethod('${m.id}')">
            <i class="fas ${m.icon} text-emerald-600 text-xl"></i>
            <div class="flex-1">
                <p class="font-medium">${m.name}</p>
                <p class="text-xs text-gray-500">${m.description}</p>
            </div>
            <i class="fas fa-check-circle text-emerald-600 hidden" id="check${m.id}"></i>
        </div>
    `).join('');
}

window.selectMethod = function(method) {
    state.selectedMethod = method;

    document.querySelectorAll('.method-card').forEach(el => {
        el.classList.remove('active-method');
        const check = el.querySelector('.fa-check-circle');
        if (check) check.classList.add('hidden');
    });

    const el = document.querySelector(`.method-card[data-method="${method}"]`);
    if (el) {
        el.classList.add('active-method');
        const check = el.querySelector('.fa-check-circle');
        if (check) check.classList.remove('hidden');
    }
};

window.prosesBayarTagihan = function() {
    if (!state.currentBill) {
        showToast('Silakan cek tagihan terlebih dahulu', 'error');
        return;
    }

    if (!state.selectedMethod) {
        showToast('Silakan pilih metode pembayaran', 'error');
        return;
    }

    const total = state.currentBill.amount + state.currentBill.fine;
    if (state.saldo < total) {
        showToast(`Saldo tidak cukup! Rp ${formatRupiah(total)} diperlukan`, 'error');
        return;
    }

    showToast('Memproses pembayaran...', 'info');

    setTimeout(() => {
        state.saldo -= total;
        updateSaldoDisplay();

        const transaction = {
            id: Date.now(),
            type: 'tagihan',
            title: `${getCategoryLabel(state.currentCategory)} - ${state.currentBill.name}`,
            amount: total,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            category: state.currentCategory,
            method: state.selectedMethod,
            status: 'success',
            bill: { ...state.currentBill }
        };

        state.history.push(transaction);
        saveState();

        showReceipt(transaction);

        const category = state.currentCategory;
        if (billData[category] && billData[category][state.currentBill.id]) {
            billData[category][state.currentBill.id].status = 'paid';
        }

        state.currentBill = null;
        document.getElementById('tagihanResult').classList.add('hidden');

    }, 1500);
};

// =============================================
// SPP
// =============================================
window.cekTagihanSpp = function() {
    const input = document.getElementById('inputNim');
    const errorEl = document.getElementById('nimError');
    const value = input.value.trim();

    if (!/^\d{12}$/.test(value)) {
        input.classList.add('error');
        errorEl.textContent = 'NIM harus 12 digit angka';
        errorEl.classList.remove('hidden');
        return;
    }

    input.classList.remove('error');
    errorEl.classList.add('hidden');

    showToast('Mencari data mahasiswa...', 'info');

    setTimeout(() => {
        const data = billData.spp[value];

        if (!data) {
            showToast('NIM tidak terdaftar', 'error');
            return;
        }

        state.sppData = { ...data, nim: value };
        displaySppResult(data);

    }, 1000);
};

function displaySppResult(data) {
    document.getElementById('sppResult').classList.remove('hidden');
    document.getElementById('sppNama').textContent = data.name;
    document.getElementById('sppProgram').textContent = `${data.program} - ${data.faculty}`;
    document.getElementById('sppSemester').textContent = data.semester;

    state.selectedSppItems = [];

    const container = document.getElementById('sppList');
    container.innerHTML = data.items.map((item, index) => `
        <div class="spp-item">
            <div class="flex items-center gap-3 flex-1">
                <input type="checkbox" id="spp_${index}" ${item.status === 'paid' ? 'disabled' : ''} 
                       onchange="toggleSppItem(${index}, this.checked)">
                <div>
                    <p class="font-medium text-sm ${item.status === 'paid' ? 'line-through text-gray-400' : ''}">${item.desc}</p>
                    <p class="text-xs ${item.status === 'paid' ? 'text-green-600' : 'text-gray-500'}">
                        ${item.status === 'paid' ? '✓ Lunas' : 'Belum Lunas'} | Jatuh Tempo: ${formatDate(item.due)}
                    </p>
                </div>
            </div>
            <span class="font-semibold ${item.status === 'paid' ? 'text-gray-400' : 'text-emerald-600'}">
                Rp ${formatRupiah(item.amount)}
            </span>
        </div>
    `).join('');

    document.getElementById('sppTotal').textContent = 'Rp 0';
    document.getElementById('sppSelectedCount').textContent = '0 cicilan dipilih';
    document.getElementById('sppResult').scrollIntoView({ behavior: 'smooth' });
}

window.toggleSppItem = function(index, checked) {
    if (!state.sppData) return;

    if (checked) {
        state.selectedSppItems.push(index);
    } else {
        state.selectedSppItems = state.selectedSppItems.filter(i => i !== index);
    }

    const total = state.selectedSppItems.reduce((sum, idx) => {
        return sum + (state.sppData.items[idx]?.amount || 0);
    }, 0);

    document.getElementById('sppTotal').textContent = `Rp ${formatRupiah(total)}`;
    document.getElementById('sppSelectedCount').textContent = `${state.selectedSppItems.length} cicilan dipilih`;
};

window.prosesBayarSpp = function() {
    if (!state.sppData) {
        showToast('Silakan cek NIM terlebih dahulu', 'error');
        return;
    }

    if (state.selectedSppItems.length === 0) {
        showToast('Pilih minimal satu cicilan', 'error');
        return;
    }

    const kodeInput = document.getElementById('inputKodeTagihan');
    const kodeError = document.getElementById('kodeTagihanError');
    const kode = kodeInput.value.trim();

    if (!kode) {
        kodeInput.classList.add('error');
        kodeError.textContent = 'Kode tagihan harus diisi';
        kodeError.classList.remove('hidden');
        return;
    }

    if (!/^\d{12,15}$/.test(kode)) {
        kodeInput.classList.add('error');
        kodeError.textContent = 'Kode tagihan harus 12-15 digit angka';
        kodeError.classList.remove('hidden');
        return;
    }

    kodeInput.classList.remove('error');
    kodeError.classList.add('hidden');

    const total = state.selectedSppItems.reduce((sum, idx) => {
        return sum + (state.sppData.items[idx]?.amount || 0);
    }, 0);

    if (state.saldo < total) {
        showToast(`Saldo tidak cukup! Rp ${formatRupiah(total)} diperlukan`, 'error');
        return;
    }

    showToast('Memproses pembayaran SPP...', 'info');

    setTimeout(() => {
        state.saldo -= total;
        updateSaldoDisplay();

        state.selectedSppItems.forEach(idx => {
            if (state.sppData.items[idx]) {
                state.sppData.items[idx].status = 'paid';
            }
        });

        const nim = state.sppData.nim;
        if (billData.spp[nim]) {
            billData.spp[nim].items = state.sppData.items;
        }

        const transaction = {
            id: Date.now(),
            type: 'spp',
            title: `SPP - ${state.sppData.name} (${state.selectedSppItems.length} cicilan)`,
            amount: total,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            method: 'VA',
            status: 'success',
            spp: {
                nim: state.sppData.nim,
                name: state.sppData.name,
                items: state.selectedSppItems.map(idx => state.sppData.items[idx])
            }
        };

        state.history.push(transaction);
        saveState();

        showReceipt(transaction);

        state.selectedSppItems = [];
        document.getElementById('sppTotal').textContent = 'Rp 0';
        document.getElementById('sppSelectedCount').textContent = '0 cicilan dipilih';
        document.getElementById('sppResult').classList.add('hidden');
        document.getElementById('inputNim').value = '';
        document.getElementById('inputKodeTagihan').value = '';

    }, 1500);
};

// =============================================
// PULSA
// =============================================
function renderProviders() {
    const container = document.getElementById('providerContainer');
    container.innerHTML = Object.entries(providerData).map(([key, provider]) => `
        <div class="provider-item ${key === state.selectedProvider ? 'active-provider' : ''}" 
             data-provider="${key}" onclick="selectProvider('${key}')">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                 style="background: ${provider.color}">
                ${provider.name.charAt(0)}
            </div>
            <span>${provider.name}</span>
        </div>
    `).join('');
}

function renderNominals() {
    const container = document.getElementById('nominalContainer');
    container.innerHTML = pulsaNominals.map(n => `
        <button class="nominal-btn ${n.value.toString() === state.selectedNominal ? 'active-nominal' : ''}" 
                data-nominal="${n.value}" onclick="selectNominal('${n.value}')">
            ${n.label}
        </button>
    `).join('');
}

function renderPaket() {
    const container = document.getElementById('paketContainer');
    container.innerHTML = paketData.map(p => `
        <button class="w-full p-3 border-2 rounded-xl text-left ${state.selectedPaket === p.id ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'}" 
                data-paket="${p.id}" onclick="selectPaket('${p.id}')">
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-medium">${p.name}</p>
                    <p class="text-xs text-gray-500">${p.desc}</p>
                </div>
                <span class="text-emerald-600 font-bold">Rp ${formatRupiah(p.price)}</span>
            </div>
        </button>
    `).join('');
}

window.selectProvider = function(provider) {
    state.selectedProvider = provider;
    document.querySelectorAll('.provider-item').forEach(el => {
        el.classList.toggle('active-provider', el.dataset.provider === provider);
    });
};

window.selectNominal = function(nominal) {
    state.selectedNominal = nominal;
    document.querySelectorAll('.nominal-btn').forEach(el => {
        el.classList.toggle('active-nominal', el.dataset.nominal === nominal);
    });
};

window.selectPaket = function(paket) {
    state.selectedPaket = state.selectedPaket === paket ? null : paket;
    renderPaket();
};

window.prosesBayarPulsa = function() {
    const hpInput = document.getElementById('inputHp');
    const hpError = document.getElementById('hpError');
    const hp = hpInput.value.trim();

    if (!/^08\d{8,11}$/.test(hp)) {
        hpInput.classList.add('error');
        hpError.textContent = 'Nomor HP harus dimulai dengan 08 dan 10-13 digit';
        hpError.classList.remove('hidden');
        return;
    }

    hpInput.classList.remove('error');
    hpError.classList.add('hidden');

    let nominal = 0;
    let customNominal = document.getElementById('inputCustomNominal').value;

    if (customNominal && parseInt(customNominal) > 0) {
        nominal = parseInt(customNominal);
    } else if (state.selectedNominal) {
        nominal = parseInt(state.selectedNominal);
    } else {
        showToast('Silakan pilih nominal pulsa', 'error');
        return;
    }

    let paketPrice = 0;
    let paketName = '';

    if (state.selectedPaket) {
        const paket = paketData.find(p => p.id === state.selectedPaket);
        if (paket) {
            paketPrice = paket.price;
            paketName = paket.name;
        }
    }

    const total = nominal + paketPrice;

    if (state.saldo < total) {
        showToast(`Saldo tidak cukup! Rp ${formatRupiah(total)} diperlukan`, 'error');
        return;
    }

    let provider = state.selectedProvider;
    for (const [prefix, prov] of Object.entries(providerMapping)) {
        if (hp.startsWith(prefix)) {
            provider = prov;
            break;
        }
    }

    showToast('Memproses pembelian...', 'info');

    setTimeout(() => {
        state.saldo -= total;
        updateSaldoDisplay();

        const transaction = {
            id: Date.now(),
            type: 'pulsa',
            title: `${paketName || 'Pulsa'} ${formatRupiah(nominal)} - ${hp}`,
            amount: total,
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            method: 'QRIS',
            status: 'success',
            pulsa: {
                hp,
                provider,
                nominal,
                paket: paketName || null,
                total
            }
        };

        state.history.push(transaction);
        saveState();

        showReceipt(transaction);

        document.getElementById('inputHp').value = '';
        document.getElementById('inputCustomNominal').value = '';
        state.selectedPaket = null;
        renderPaket();

    }, 1500);
};

// =============================================
// RECEIPT
// =============================================
function showReceipt(transaction) {
    const isPulsa = transaction.type === 'pulsa';
    const isSpp = transaction.type === 'spp';

    let detailHtml = '';

    if (isPulsa) {
        detailHtml = `
            <div class="text-sm space-y-1">
                <p><span class="text-gray-500">Nomor HP:</span> ${transaction.pulsa.hp}</p>
                <p><span class="text-gray-500">Provider:</span> ${transaction.pulsa.provider}</p>
                ${transaction.pulsa.nominal > 0 ? `<p><span class="text-gray-500">Pulsa:</span> Rp ${formatRupiah(transaction.pulsa.nominal)}</p>` : ''}
                ${transaction.pulsa.paket ? `<p><span class="text-gray-500">Paket:</span> ${transaction.pulsa.paket}</p>` : ''}
            </div>
        `;
    } else if (isSpp) {
        detailHtml = `
            <div class="text-sm space-y-1">
                <p><span class="text-gray-500">NIM:</span> ${transaction.spp.nim}</p>
                <p><span class="text-gray-500">Nama:</span> ${transaction.spp.name}</p>
                <p><span class="text-gray-500">Cicilan dibayar:</span> ${transaction.spp.items.length} item</p>
            </div>
        `;
    } else {
        detailHtml = `
            <div class="text-sm space-y-1">
                <p><span class="text-gray-500">Kategori:</span> ${getCategoryLabel(transaction.category)}</p>
                <p><span class="text-gray-500">Pelanggan:</span> ${transaction.bill.name}</p>
                <p><span class="text-gray-500">Periode:</span> ${transaction.bill.period}</p>
            </div>
        `;
    }

    const methodLabels = {
        'va': 'Virtual Account',
        'qris': 'QRIS',
        'teller': 'Bayar di Teller'
    };

    const methodLabel = methodLabels[transaction.method] || transaction.method || 'Transfer';

    let qrHtml = '';
    if (transaction.method === 'qris' && !isSpp) {
        const vaCode = generateVA();
        qrHtml = `
            <div class="bg-white p-4 rounded-xl text-center">
                <div id="qrcode" class="flex justify-center"></div>
                <p class="text-xs text-gray-500 mt-2">Scan QR code untuk pembayaran</p>
                <div class="text-sm mt-2">
                    <p class="font-mono">${vaCode}</p>
                    <p class="text-xs text-gray-500">Kode Virtual Account</p>
                </div>
                <div class="timer mt-2" id="qrTimer">05:00</div>
            </div>
        `;
    }

    const html = `
        <div class="text-center mb-4">
            <i class="fas fa-check-circle text-5xl text-emerald-600 mb-2"></i>
            <h2 class="text-xl font-bold">Pembayaran Berhasil!</h2>
            <p class="text-gray-500 text-sm">Transaksi berhasil diproses</p>
        </div>

        <div class="border-t border-b py-4 my-4">
            <div class="flex justify-between text-sm">
                <span class="text-gray-500">ID Transaksi</span>
                <span class="font-mono">#${transaction.id}</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
                <span class="text-gray-500">Tanggal</span>
                <span>${transaction.date} ${transaction.time}</span>
            </div>
            <div class="flex justify-between text-sm mt-1">
                <span class="text-gray-500">Metode</span>
                <span>${methodLabel}</span>
            </div>
        </div>

        ${qrHtml}

        <div class="mb-4">
            <p class="text-gray-500 text-sm">${isPulsa ? 'Pembelian' : 'Pembayaran'}</p>
            <p class="font-semibold">${transaction.title}</p>
        </div>

        ${detailHtml}

        <div class="border-t pt-4 mt-4 flex justify-between items-center">
            <span class="font-bold text-lg">Total</span>
            <span class="font-bold text-2xl text-emerald-600">Rp ${formatRupiah(transaction.amount)}</span>
        </div>

        <div class="flex gap-3 mt-6 no-print">
            <button class="flex-1 btn-primary" onclick="window.print()">
                <i class="fas fa-print"></i> Cetak
            </button>
            <button class="flex-1 btn-secondary" onclick="exportPDF()">
                <i class="fas fa-file-pdf"></i> PDF
            </button>
        </div>
        <button class="btn-secondary w-full mt-2 no-print" onclick="closeModal(); navigateTo('riwayat')">
            Lihat Riwayat
        </button>
    `;

    showModal(html);

    if (transaction.method === 'qris' && !isSpp) {
        setTimeout(() => {
            const qrContainer = document.getElementById('qrcode');
            if (qrContainer && typeof QRCode !== 'undefined') {
                qrContainer.innerHTML = '';
                new QRCode(qrContainer, {
                    text: generateVA(),
                    width: 180,
                    height: 180,
                    colorDark: '#059669',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
                startTimer(300);
            }
        }, 300);
    }
}

function startTimer(seconds) {
    let remaining = seconds;
    const timerEl = document.getElementById('qrTimer');
    if (!timerEl) return;

    const interval = setInterval(() => {
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (remaining <= 0) {
            clearInterval(interval);
            timerEl.textContent = '⏰ Expired';
            timerEl.style.color = '#ef4444';
            showToast('QR Code telah kadaluarsa', 'error');
        }
        remaining--;
    }, 1000);
}

window.exportPDF = function() {
    if (typeof window.jspdf !== 'undefined') {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text('BayarKita - Bukti Transaksi', 20, 20);
        doc.text(`ID: #${Date.now()}`, 20, 30);
        doc.text(`Tanggal: ${new Date().toLocaleString('id-ID')}`, 20, 40);
        doc.text('Total: Rp ' + formatRupiah(state.history[state.history.length - 1]?.amount || 0), 20, 50);
        doc.save('struk-bayarkita.pdf');
        showToast('PDF berhasil diunduh', 'success');
    } else {
        showToast('Library jsPDF belum siap', 'error');
    }
};

// =============================================
// RIWAYAT
// =============================================
let currentFilter = 'all';

window.renderHistory = function(filter = currentFilter) {
    const container = document.getElementById('historyList');
    let data = state.history;

    if (filter !== 'all') {
        data = data.filter(t => t.type === filter);
    }

    if (data.length === 0) {
        container.innerHTML = `
            <div class="card text-center py-12">
                <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                <p class="text-gray-500">Belum ada transaksi</p>
                <p class="text-xs text-gray-400">Mulai bayar tagihan atau isi pulsa</p>
            </div>
        `;
        return;
    }

    container.innerHTML = data.slice().reverse().map(t => `
        <div class="card p-4">
            <div class="flex justify-between items-start">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <i class="fas ${getIconForType(t.type)}"></i>
                    </div>
                    <div>
                        <p class="font-medium text-sm">${t.title}</p>
                        <p class="text-xs text-gray-500">${t.date} ${t.time || ''}</p>
                    </div>
                </div>
                <span class="font-bold text-emerald-600">-Rp ${formatRupiah(t.amount)}</span>
            </div>
            <div class="mt-2 flex gap-2 text-xs">
                <span class="badge badge-success">${t.type.toUpperCase()}</span>
                <span class="badge badge-info">${t.method || 'Transfer'}</span>
            </div>
        </div>
    `).join('');
};

window.filterHistory = function(filter) {
    currentFilter = filter;
    document.querySelectorAll('#page-riwayat [data-filter]').forEach(el => {
        el.classList.remove('bg-emerald-600', 'text-white');
        el.classList.add('bg-gray-200', 'text-gray-700');
    });

    const el = document.querySelector(`#page-riwayat [data-filter="${filter}"]`);
    if (el) {
        el.classList.add('bg-emerald-600', 'text-white');
        el.classList.remove('bg-gray-200', 'text-gray-700');
    }

    renderHistory(filter);
};

window.clearHistory = function() {
    if (state.history.length === 0) {
        showToast('Tidak ada riwayat', 'info');
        return;
    }

    if (confirm('Hapus semua riwayat transaksi?')) {
        state.history = [];
        saveState();
        renderHistory();
        renderRecentTransactions();
        showToast('Riwayat berhasil dihapus', 'success');
    }
};

// =============================================
// INITIALIZATION
// =============================================
// Load state from localStorage
loadState();

// Render components
renderProviders();
renderNominals();
renderPaket();
renderRecentTransactions();
renderHistory();

// Apply dark mode if saved
if (state.darkMode) {
    document.documentElement.classList.add('dark');
    document.getElementById('darkModeIcon').className = 'fas fa-sun';
}

// Handle Enter key for forms
document.getElementById('inputPelanggan').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') window.cekTagihan();
});

document.getElementById('inputNim').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') window.cekTagihanSpp();
});

document.getElementById('inputHp').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') window.prosesBayarPulsa();
});

console.log('💰 BayarKita App initialized successfully!');
console.log('📱 Mobile-optimized with marketplace-style UI');
console.log('📊 Data loaded:', Object.keys(billData).length, 'categories');