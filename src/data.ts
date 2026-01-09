// Faker import removed

export const generateData = (count: number, prefix: string) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `${prefix}-${i}`,
        dnNo: `QBF${6453800 + i}`,
        partNo: i % 2 === 0 ? 'MG874AH/A' : 'MG854AH/A',
        productName: i % 2 === 0 ? 'IPHONE 17 PRO DEEP BLUE 256GB' : 'IPHONE 17 PRO SILVER 256GB',
        coo: '',
        hsCode: '851713000000',
        qty: Math.floor(Math.random() * 200) + 10,
        unitPrice: 1086.94,
        totalPriceUSD: 0, // calc later
        totalPriceSAR: 0, // calc later
        cn: 'CN',
        uploaded: true,
        bookingRef: 'BK019092'
    })).map(item => ({
        ...item,
        totalPriceUSD: parseFloat((item.qty * item.unitPrice).toFixed(2)),
        totalPriceSAR: parseFloat((item.qty * item.unitPrice * 3.75).toFixed(2))
    }));
};

export const shipment1 = generateData(15, 'S1');
export const shipment2 = generateData(8, 'S2');
