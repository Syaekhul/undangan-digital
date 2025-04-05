const gallery = document.getElementById("gallery");
let scrollAmount = 0;
const scrollStep = 400;
const delay = 2000;

function autoScroll() {
  if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
    scrollAmount = 0;
  } else {
    scrollAmount += scrollStep;
  }
  gallery.scrollTo({
    left: scrollAmount,
    behavior: "smooth"
  });
}

setInterval(autoScroll, delay);

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById("copy-message");
    msg.style.display = "block";
    setTimeout(() => {
      msg.style.display = "none";
    }, 2000);
  });
}

function sendToWhatsApp() {
  const name = document.getElementById("name").value.trim();
  const pax = document.getElementById("pax").value.trim();
  const confirm = document.querySelector('input[name="confirm"]:checked');

  if (!name || !confirm) {
    alert("Mohon lengkapi semua data.");
    return;
  }

  const confirmation = confirm.value;

  let message = `Hallo, saya ingin mengkonfirmasi kehadiran:\n\nNama: ${name},`;

  if (confirmation === "yes") {
    if (!pax) {
      alert("Mohon isi jumlah orang jika Anda akan hadir.");
      return;
    }
    message += `\nKonfirmasi: Iya, Saya akan hadir,\nJumlah Pax: ${pax}.`;
  } else {
    message += `\nKonfirmasi: Tidak, Saya tidak akan hadir.`;
  }

  // Ganti nomor WhatsApp di bawah ini (gunakan format internasional, tanpa tanda)
  const phoneNumber = "6289613910986";

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}
