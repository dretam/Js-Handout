{
    /* 
        Perhatikan contoh dibawah code dibawah.
        Contoh pada code dibawah bercerita tentang pengurusan pengiriman barang yang dibeli oleh 3 customers.
        Pembelian ini akan diproses secara asychronous oleh Promise.

        Pada contoh, kita membuat dan menggunakan sebuah function yang berisikan promise dengan nama executeTransaction.
    */
    let processStep = {
        CHECKING : Symbol('Checking'),
        PICKING: Symbol('Picking'),
        PACKING: Symbol('Packing'),
        DELIVERING: Symbol('Delivering'),
        RECEIVED: Symbol('Received')
    };
    
    //Informasi stock yang disimpan dalam collection Map
    let stockReady = new Map();
    stockReady.set('Intel i7 2600k', true);
    stockReady.set('GPU GTX 1080', true);
    stockReady.set('16 Gb Kingston DDR3', false);

    //Check stock, baik false maupun undefined akan berakhir dengan false apabila di convert dengan Boolean.
    let checkStock = transaction => (Boolean(stockReady.get(transaction.barang))) ? true : false;

    /*
        pickItem, packItem, deliveringItem, receivingItem adalah function proses pengurusan barang serta notifikasinya.
        rejecting adalah function yang akan jalan apabila masuk ke dalam reject scenario dan di catch
    */
    let pickItem = transaction => {
        console.log(`Mengambil ${transaction.barang} dari stock persediaan`);
        transaction.statusPengiriman = processStep.PICKING;
        return transaction;
    }
    let packItem = transaction => {
        console.log(`Packing barang ${transaction.barang} untuk di kirim ke alamat ${transaction.pembeli}`);
        transaction.statusPengiriman = processStep.PACKING;
        return transaction;
    }
    let deliveringItem = transaction => {
        console.log(`Barang sedang dalam perjalanan ke ${transaction.alamat}`);
        transaction.statusPengiriman = processStep.DELIVERING;
        return transaction;
    }
    let receivingItem = transaction => {
        console.log(`Barang sudah diterima oleh ${transaction.pembeli}`);
        transaction.statusPengiriman = processStep.RECEIVED;
    }
    let rejecting = message => console.log(message);
    
    //function utama yang berisikan promise bila di invoke
    let executeTransaction = transaction => {
        let replyMessage = (resolve, reject) => {
            checkStock(transaction) ? resolve(transaction) : reject(`Nama atau stock ${transaction.barang} tidak ditemukan.`);
        }
        let replyPromise = new Promise(replyMessage);
        replyPromise
            .then(pickItem.bind(this, transaction))
            .then(packItem.bind(this, transaction))
            .then(deliveringItem.bind(this, transaction))
            .then(receivingItem.bind(this, transaction))
            .catch(rejecting);
    }

    //Invoking 3 permintaan
    executeTransaction({
        pembeli: 'Faizal Tamim',
        barang: '16 Gb Kingston DDR3',
        alamat: 'EFG Street',
        statusPengiriman: processStep.CHECKING
    });
    executeTransaction({
        pembeli: 'Andy Harlan',
        barang: 'GPU GTX 1080',
        alamat: 'XYZ Street',
        statusPengiriman: processStep.CHECKING
    });
    executeTransaction({
        pembeli: 'Budi Agustian',
        barang: 'Intel i7 2600k',
        alamat: 'ABC Street',
        statusPengiriman: processStep.CHECKING
    });
}