// =============================================
// DATA DUMMY - BayarKita Application
// =============================================

export const billData = {
    // ============ PLN LISTRIK ============
    pln: {
        "123456789012": {
            name: "Ahmad Fauzi",
            address: "Jl. Merdeka No. 45, Jakarta Pusat",
            period: "Februari 2026",
            due: "2026-03-10",
            amount: 245000,
            fine: 0,
            status: "unpaid",
            daya: "900 VA",
            golongan: "R1"
        },
        "234567890123": {
            name: "Siti Rahayu",
            address: "Jl. Sudirman No. 78, Bandung",
            period: "Februari 2026",
            due: "2026-03-15",
            amount: 532000,
            fine: 15000,
            status: "unpaid",
            daya: "1300 VA",
            golongan: "R1"
        },
        "345678901234": {
            name: "Budi Santoso",
            address: "Jl. Diponegoro No. 12, Surabaya",
            period: "Februari 2026",
            due: "2026-03-20",
            amount: 187000,
            fine: 0,
            status: "unpaid",
            daya: "450 VA",
            golongan: "R1"
        },
        "456789012345": {
            name: "Dewi Lestari",
            address: "Jl. Pahlawan No. 9, Yogyakarta",
            period: "Februari 2026",
            due: "2026-03-05",
            amount: 410000,
            fine: 25000,
            status: "unpaid",
            daya: "2200 VA",
            golongan: "R2"
        },
        "567890123456": {
            name: "Rudi Hartono",
            address: "Jl. Gajah Mada No. 33, Medan",
            period: "Februari 2026",
            due: "2026-03-25",
            amount: 298000,
            fine: 0,
            status: "unpaid",
            daya: "1300 VA",
            golongan: "R1"
        }
    },
    // ============ PDAM ============
    pdam: {
        "678901234567": {
            name: "Toko Jaya Abadi",
            address: "Jl. Raya No. 15, Jakarta Selatan",
            period: "Februari 2026",
            due: "2026-03-12",
            amount: 185000,
            fine: 0,
            status: "unpaid",
            meter: "A-7890",
            usage: "45 m³"
        },
        "789012345678": {
            name: "Rumah Sakit Harapan",
            address: "Jl. Kesehatan No. 7, Bandung",
            period: "Februari 2026",
            due: "2026-03-18",
            amount: 420000,
            fine: 12000,
            status: "unpaid",
            meter: "B-4567",
            usage: "120 m³"
        },
        "890123456789": {
            name: "Hotel Permata Indah",
            address: "Jl. Wisata No. 3, Bali",
            period: "Februari 2026",
            due: "2026-03-22",
            amount: 750000,
            fine: 45000,
            status: "unpaid",
            meter: "C-1234",
            usage: "210 m³"
        }
    },
    // ============ INTERNET ============
    internet: {
        "901234567890": {
            name: "PT. Teknologi Nusantara",
            address: "Jl. Cyber No. 10, Jakarta Pusat",
            period: "Februari 2026",
            due: "2026-03-08",
            amount: 550000,
            fine: 0,
            status: "unpaid",
            package: "BizNet 100 Mbps",
            speed: "100 Mbps"
        },
        "012345678901": {
            name: "Kantor Desa Maju",
            address: "Jl. Desa No. 5, Jawa Barat",
            period: "Februari 2026",
            due: "2026-03-14",
            amount: 320000,
            fine: 8000,
            status: "unpaid",
            package: "HomeNet 50 Mbps",
            speed: "50 Mbps"
        },
        "123456789013": {
            name: "Sekolah Digital Indonesia",
            address: "Jl. Pendidikan No. 2, Yogyakarta",
            period: "Februari 2026",
            due: "2026-03-28",
            amount: 450000,
            fine: 0,
            status: "unpaid",
            package: "EduNet 75 Mbps",
            speed: "75 Mbps"
        }
    },
    // ============ SEMINAR ============
    seminar: {
        "SEM-2026-001": {
            name: "Workshop AI & Machine Learning",
            address: "Jakarta Convention Center, Ruang A",
            period: "15 Maret 2026",
            due: "2026-03-20",
            amount: 2500000,
            fine: 0,
            status: "unpaid",
            speaker: "Dr. Andi Wijaya",
            seat: "A-12"
        },
        "SEM-2026-002": {
            name: "Seminar Digital Marketing 2026",
            address: "Grand Hyatt Jakarta, Ballroom B",
            period: "5 April 2026",
            due: "2026-04-05",
            amount: 1750000,
            fine: 200000,
            status: "unpaid",
            speaker: "Ir. Budi Santoso",
            seat: "B-08"
        },
        "SEM-2026-003": {
            name: "Tech Innovation Summit",
            address: "ICE BSD, Hall 3",
            period: "20 Maret 2026",
            due: "2026-03-18",
            amount: 3200000,
            fine: 0,
            status: "unpaid",
            speaker: "Prof. Dr. Bambang",
            seat: "VIP-01"
        }
    },
    // ============ SPP ============
    spp: {
        "202310001": {
            name: "Andi Wijaya",
            nim: "202310001",
            semester: "Ganjil 2025/2026",
            program: "S1 - Teknik Informatika",
            faculty: "Fakultas Teknik",
            items: [
                { id: 1, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-1", amount: 2500000, status: "paid", due: "2025-08-15" },
                { id: 2, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-2", amount: 2500000, status: "paid", due: "2025-09-15" },
                { id: 3, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-3", amount: 2500000, status: "unpaid", due: "2025-10-15" },
                { id: 4, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-4", amount: 2500000, status: "unpaid", due: "2025-11-15" },
                { id: 5, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-5", amount: 2500000, status: "unpaid", due: "2025-12-15" },
                { id: 6, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-6", amount: 2500000, status: "unpaid", due: "2026-01-15" },
                { id: 7, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-7", amount: 2500000, status: "unpaid", due: "2026-02-15" },
                { id: 8, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-8", amount: 2500000, status: "unpaid", due: "2026-03-15" }
            ]
        },
        "202310002": {
            name: "Bella Putri",
            nim: "202310002",
            semester: "Genap 2025/2026",
            program: "S1 - Manajemen",
            faculty: "Fakultas Ekonomi",
            items: [
                { id: 1, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-1", amount: 3500000, status: "paid", due: "2026-02-15" },
                { id: 2, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-2", amount: 3500000, status: "unpaid", due: "2026-03-15" },
                { id: 3, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-3", amount: 3500000, status: "unpaid", due: "2026-04-15" },
                { id: 4, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-4", amount: 3500000, status: "unpaid", due: "2026-05-15" },
                { id: 5, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-5", amount: 3500000, status: "unpaid", due: "2026-06-15" },
                { id: 6, desc: "SPP Semester Genap 2025/2026 - Cicilan ke-6", amount: 3500000, status: "unpaid", due: "2026-07-15" }
            ]
        },
        "202310003": {
            name: "Cahya Nugraha",
            nim: "202310003",
            semester: "Ganjil 2025/2026",
            program: "S1 - Sistem Informasi",
            faculty: "Fakultas Teknik",
            items: [
                { id: 1, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-1", amount: 2000000, status: "paid", due: "2025-08-15" },
                { id: 2, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-2", amount: 2000000, status: "paid", due: "2025-09-15" },
                { id: 3, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-3", amount: 2000000, status: "paid", due: "2025-10-15" },
                { id: 4, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-4", amount: 2000000, status: "unpaid", due: "2025-11-15" },
                { id: 5, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-5", amount: 2000000, status: "unpaid", due: "2025-12-15" },
                { id: 6, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-6", amount: 2000000, status: "unpaid", due: "2026-01-15" },
                { id: 7, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-7", amount: 2000000, status: "unpaid", due: "2026-02-15" },
                { id: 8, desc: "SPP Semester Ganjil 2025/2026 - Cicilan ke-8", amount: 2000000, status: "unpaid", due: "2026-03-15" }
            ]
        }
    }
};

// Provider Mapping
export const providerMapping = {
    '0811': 'telkomsel',
    '0812': 'telkomsel',
    '0813': 'telkomsel',
    '0821': 'telkomsel',
    '0822': 'telkomsel',
    '0823': 'telkomsel',
    '0852': 'telkomsel',
    '0853': 'telkomsel',
    '0814': 'indosat',
    '0815': 'indosat',
    '0816': 'indosat',
    '0855': 'indosat',
    '0856': 'indosat',
    '0857': 'indosat',
    '0858': 'indosat',
    '0817': 'xl',
    '0818': 'xl',
    '0819': 'xl',
    '0859': 'xl',
    '0877': 'xl',
    '0878': 'xl',
    '0879': 'xl',
    '0895': 'tri',
    '0896': 'tri',
    '0897': 'tri',
    '0898': 'tri',
    '0899': 'tri',
    '0881': 'smartfren',
    '0882': 'smartfren',
    '0883': 'smartfren',
    '0884': 'smartfren',
    '0885': 'smartfren',
    '0886': 'smartfren',
    '0887': 'smartfren',
    '0888': 'smartfren',
    '0889': 'smartfren',
    '0831': 'axis',
    '0832': 'axis',
    '0833': 'axis',
    '0838': 'axis',
    '0851': 'axis'
};

export const providerData = {
    telkomsel: { name: 'Telkomsel', color: '#ea1f3d' },
    xl: { name: 'XL Axiata', color: '#007dc3' },
    indosat: { name: 'Indosat', color: '#ed1c24' },
    tri: { name: 'Tri (3)', color: '#0064b0' },
    smartfren: { name: 'Smartfren', color: '#ed1c24' },
    axis: { name: 'Axis', color: '#ffd700' }
};

export const pulsaNominals = [
    { value: 10000, label: 'Rp 10.000' },
    { value: 25000, label: 'Rp 25.000' },
    { value: 50000, label: 'Rp 50.000' },
    { value: 100000, label: 'Rp 100.000' },
    { value: 200000, label: 'Rp 200.000' },
    { value: 500000, label: 'Rp 500.000' }
];

export const paketData = [
    { id: '5gb', name: 'Paket 5GB', price: 50000, desc: 'Masa aktif 30 hari' },
    { id: '10gb', name: 'Paket 10GB', price: 85000, desc: 'Masa aktif 30 hari' },
    { id: '20gb', name: 'Paket 20GB', price: 145000, desc: 'Masa aktif 30 hari' },
    { id: '30gb', name: 'Paket 30GB', price: 195000, desc: 'Masa aktif 30 hari' },
    { id: 'unlimited', name: 'Paket Unlimited', price: 250000, desc: 'Masa aktif 30 hari' }
];

export const paymentMethods = [
    { id: 'va', name: 'Virtual Account', icon: 'fa-university', description: 'Transfer bank BCA/BNI/Mandiri' },
    { id: 'qris', name: 'QRIS', icon: 'fa-qrcode', description: 'Scan QR code dengan e-wallet' },
    { id: 'teller', name: 'Bayar di Teller', icon: 'fa-store', description: 'Kantor cabang terdekat' }
];

// =============================================
// UTILITY FUNCTIONS
// =============================================
export function getProviderFromNumber(hp) {
    for (const [prefix, provider] of Object.entries(providerMapping)) {
        if (hp.startsWith(prefix)) {
            return provider;
        }
    }
    return null;
}

export function getProviderData(providerId) {
    return providerData[providerId] || null;
}

export function getBill(category, id) {
    if (billData[category] && billData[category][id]) {
        return { ...billData[category][id], id, category };
    }
    return null;
}

export function getSppData(nim) {
    if (billData.spp[nim]) {
        return { ...billData.spp[nim], nim };
    }
    return null;
}