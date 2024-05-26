// Inisialisasi array untuk menyimpan riwayat perhitungan faktorial dan perpangkatan
let riwayatFaktorial = [];
let riwayatPerpangkatan = [];

// Fungsi untuk menghitung faktorial
function hitungFaktorial() {
  let angka = document.getElementById("faktorialInput").value;
  let hasil = 1;
  for (let i = 1; i <= angka; i++) {
    hasil *= i;
  }
  document.getElementById("faktorialOutput").value = hasil;
  
  // Menyimpan riwayat perhitungan faktorial
  let tanggal = new Date();
  let data = {
    tanggal: tanggal.toLocaleString(),
    jenis: "Faktorial",
    input: angka,
    output: hasil
  };
  riwayatFaktorial.push(data);
  simpanDataKeFile("riwayatFaktorial.txt", riwayatFaktorial);
}

// Fungsi untuk menghitung perpangkatan
function hitungPerpangkatan() {
  let angka = document.getElementById("perpangkatanInput").value;
  let pangkat = document.getElementById("pangkatInput").value;
  let hasil = Math.pow(angka, pangkat);
  document.getElementById("perpangkatanOutput").value = hasil;
  
  // Menyimpan riwayat perhitungan perpangkatan
  let tanggal = new Date();
  let data = {
    tanggal: tanggal.toLocaleString(),
    jenis: "Perpangkatan",
    input: angka + "^" + pangkat,
    output: hasil
  };
  riwayatPerpangkatan.push(data);
  simpanDataKeFile("riwayatPerpangkatan.txt", riwayatPerpangkatan);
}

// Fungsi untuk menyimpan data ke dalam file txt atau csv
function simpanDataKeFile(namaFile, data) {
  let csvData = "Tanggal,Jenis,Input,Output\n";
  for (let i = 0; i < data.length; i++) {
    csvData += data[i].tanggal + "," + data[i].jenis + "," + data[i].input + "," + data[i].output + "\n";
  }
  
  // Menentukan tipe file yang akan disimpan (txt atau csv)
  let fileType = "";
  if (namaFile.endsWith(".txt")) {
    fileType = "text/plain";
  } else if (namaFile.endsWith(".csv")) {
    fileType = "text/csv";
  }
  
  // Membuat objek File dengan data yang akan disimpan
  let file = new File([csvData], namaFile, { type: fileType });
  
  // Membuat objek URL untuk mendownload file
  let url = URL.createObjectURL(file);
  
  // Membuat tag <a> dan mengekliknya secara otomatis untuk memulai unduhan
  let link = document.createElement("a");
  link.href = url;
  link.download = namaFile;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
