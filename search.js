async function loadFlightsData() {
    try {
        const response = await fetch('penerbangan.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not load flights data:", error);
    }
}

async function searchItem() {
    const flightsData = await loadFlightsData();

    if (flightsData) {
        const jenisTiket = document.getElementById('jenis').value;
        const hargaAwalInput = document.getElementById('harga').value;
        const hinggaHargaInput = document.getElementById('hingga').value;

        // Validate
        if(hargaAwalInput === '' || hinggaHargaInput === ''){
            const hargaAwalInputBar = document.getElementById('harga');
            const hinggaHargaInputBar = document.getElementById('hingga');

            hargaAwalInputBar.style.border = "1px solid red";
            hinggaHargaInputBar.style.border = "1px solid red";

            alert("Error! Anda belum memasukkan harga yang dicari!");
            return;
        }

        // Convert
        const hargaAwal = parseInt(hargaAwalInput, 10);
        const hinggaHarga = parseInt(hinggaHargaInput, 10);
        

        const filteredData = flightsData.filter(flight => {
            const price = jenisTiket === 'Oneway' ? flight.Oneway : flight.Return;
            return price >= hargaAwal && price <= hinggaHarga;
        });

        const container = document.getElementById('container');
        if (filteredData.length > 0) {
            container.innerHTML = '';
            const headerRow = `<tr>
                <th>Kode</th>
                <th>Tujuan</th>
                <th>Maskapai</th>
                <th>Jenis</th>
                <th>Harga</th>
            </tr>`;
            container.innerHTML += headerRow;

            filteredData.forEach(flight => {
                const row = `<tr>
                    <td>${flight.Kode}</td>
                    <td>${flight.Tujuan}</td>
                    <td>${flight.Maskapai}</td>
                    <td>${flight.Jenis}</td>
                    <td>${jenisTiket === 'Oneway' ? flight.Oneway : flight.Return}</td>
                </tr>`;
                container.innerHTML += row;
            });
        } else {
            container.innerHTML = '<tr><td colspan="5">Tidak ditemukan Maskapai yang ada.</td></tr>';
        }
    }
}
