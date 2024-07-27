const express = require('express');	
const router = express.Router();
const crypto = require('crypto');
const Invoice = require('../models/invoice');
const formatTimestamp = require('../utils/formatTimestamp');
const { default: axios } = require('axios');
require('dotenv').config();

router.post('/', async (request, res) => {
    try {
        const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY;
        const BASE_URL = process.env.BASE_URL;
        const callbackSignature = request.headers["X_CALLBACK_SIGNATURE"];
        const json = request.body;
        
        const signature = crypto.createHmac("sha256", TRIPAY_API_KEY)
            .update(JSON.stringify(request.body))
            .digest('hex');

        const hasil = json;
        console.log(hasil);

        const getStatus = (status) => {
            switch (status) {
                case 'UNPAID':
                    return 'Pending';
                case 'PAID':
                    return 'Processing';
                case 'EXPIRED':
                    return 'Cancelled';
                case 'FAILED':
                    return 'Failed';
                default:
                    return 'Unknown';
            }
        };

        const getMsg = (status) => {
            switch(status) {
                case 'UNPAID':
                    return 'Menunggu pembayaran';
                case 'PAID':
                    return `Transaksi Sedang di proses. Pembayaran selesai pada ${formatTimestamp(hasil.paid_at)}`;
                case 'EXPIRED':
                    return `Transaksi tidak bisa diproses. Pembayaran hangus pada ${formatTimestamp(hasil.paid_at)}`;
                case 'FAILED':
                    return 'Pembayaran gagal dilakukan.';
                default:
                    return 'Unknown status.';
            }
        };

        await Invoice.update({status_pembayaran: hasil.status}, {
            where:{no_invoice: hasil.reference}
        });

        await Invoice.update({status_transaksi: getStatus(hasil.status)}, {
            where:{no_invoice: hasil.reference}
        });

        await Invoice.update({pesan: getMsg(hasil.status)}, {
            where:{no_invoice: hasil.reference}
        });

        if (hasil.status === 'PAID') {
            const data = await Invoice.findOne({
                where: {
                    no_invoice: hasil.reference,
                },
            });

            if (data) {
                const { userid: id, userserver: server, kode_game: code } = data;

                try {
                    const response = await axios.post(`${BASE_URL}/transactions/add`, {
                        id,
                        server,
                        code
                    });

                    if (response.data.data.result) {
                        console.log('berhasil');
                        await Invoice.update({no_trxid: response.data.data.data.trxid}, {
                            where: {no_invoice: hasil.reference}
                        });
                        await Invoice.update({pesan: `Transaksi Berhasil di proses. Pembayaran selesai pada pada ${formatTimestamp(hasil.paid_at)}`}, {
                            where: {no_invoice: hasil.reference}
                        })
                    } else {
                        console.log('gagal');
                        await Invoice.update({status_transaksi: 'Failed'}, {
                            where: {no_invoice: hasil.reference}
                        })
                        await Invoice.update({pesan: response.data.data.message}, {
                            where: {no_invoice: hasil.reference}
                        })
                    }

                    console.log(response.data);
                } catch (error) {
                    return res.status(500).json({ msg: error.message });
                }
            } else {
                return res.status(404).json({ data: 'invoice not found' });
            }
        }

        res.status(200).json({ status: '[layla] OK' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;