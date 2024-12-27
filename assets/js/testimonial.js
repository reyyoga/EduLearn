document.addEventListener('DOMContentLoaded', () => {
    const testimonialsData = [
        {
            text: "“Aduh Gantengnyaa”",
            name: "Azril",
        },
    ];

    const carousel = document.getElementById('testimonials-carousel');
    const testimonialForm = document.getElementById('testimonial-form');

    // Fungsi untuk membuat elemen testimonial
    const createTestimonialItem = (testimonial) => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <p>${testimonial.text}</p>
            <div class="author">
                <h4>${testimonial.name}</h4>
            </div>
        `;

        // Menambahkan styling untuk latar belakang
        div.style.backgroundColor = '#d6a354';  // Menambahkan warna latar belakang
        div.style.borderRadius = '10px';  // Menambahkan border-radius agar lebih halus
        div.style.padding = '20px';  // Memberikan jarak di dalam elemen
        div.style.margin = '10px 0';
        return div;
    };

    // Fungsi untuk memuat testimonial ke dalam carousel
    const loadTestimonials = () => {
        carousel.innerHTML = '';  // Menghapus semua testimonial sebelumnya
        testimonialsData.forEach((testimonial) => {
            const testimonialItem = createTestimonialItem(testimonial);
            carousel.appendChild(testimonialItem);
        });

        // Mengaktifkan carousel (opsional jika menggunakan OwlCarousel)
        if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
            jQuery('#testimonials-carousel').owlCarousel({
                items: 1,
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
                dots: true,
            });
        }
    };

    // Memuat testimonial awal
    loadTestimonials();

    // Event listener untuk form testimonial
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil nilai input dan log hasilnya
        const name = document.getElementById('names').value.trim();
        const message = document.getElementById('messages').value.trim();

        console.log("Names:", name);       // Debugging nilai name
        console.log("Messages:", message);  // Debugging nilai message

        // Jika nilai input kosong
        if (!name || !message) {
            showToast('All fields are required!', 'danger');
            return;
        }

        // Menambahkan tanda petik di sekitar message dan category
        const newTestimonial = {
            text: `"${message}"`,    // Menambahkan tanda petik di sekitar message 
            name: name,
        };

        testimonialsData.push(newTestimonial); // Tambahkan testimonial ke data
        loadTestimonials(); // Refresh carousel dengan testimonial baru
        testimonialForm.reset(); // Reset form
        showToast('Thank you for your testimonial!', 'success');
    });

    // Fungsi untuk menampilkan toast notification
    function showToast(message, type) {
        // Membuat elemen toast baru
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;

        // Menambahkan styling berdasarkan tipe pesan
        if (type === 'success') {
            toast.style.backgroundColor = '#28a745';  // Green for success
        } else if (type === 'danger') {
            toast.style.backgroundColor = '#dc3545';  // Red for error
        }

        // Menambahkan toast ke body
        document.body.appendChild(toast);

        // Menampilkan toast
        setTimeout(() => {
            toast.style.opacity = 1;
        }, 100);

        // Menghilangkan toast setelah 3 detik
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => {
                toast.remove();  // Menghapus elemen setelah animasi selesai
            }, 500);
        }, 3000);
    }
});
