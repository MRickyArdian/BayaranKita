// =============================================
// UTILITY FUNCTIONS
// =============================================

export function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID').format(amount);
}

export function formatDate(dateStr) {
    if (!dateStr) return '-';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
    }
    return dateStr;
}

export function generateVA() {
    return '8810' + Date.now().toString().slice(-12);
}

export function getIconForType(type) {
    const icons = {
        'tagihan': 'fa-file-invoice',
        'spp': 'fa-graduation-cap',
        'pulsa': 'fa-mobile-alt'
    };
    return icons[type] || 'fa-receipt';
}

export function getCategoryLabel(category) {
    const labels = {
        'pln': 'PLN Listrik',
        'pdam': 'PDAM',
        'internet': 'Internet',
        'seminar': 'Seminar'
    };
    return labels[category] || category;
}

export function getCategoryIcon(category) {
    const icons = {
        'pln': 'fa-bolt',
        'pdam': 'fa-water',
        'internet': 'fa-wifi',
        'seminar': 'fa-chalkboard-teacher'
    };
    return icons[category] || 'fa-file-invoice';
}