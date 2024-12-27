document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const profileModal = document.getElementById('profile-modal');
    const closeModalButton = document.querySelector('.close-btn');
    const logoutButton = document.getElementById('logout-btn');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const userProfileName = document.getElementById('user-profile-name');
    const profileNav = document.getElementById('profile-nav');
    const signupNav = document.getElementById('signup-nav');
    const dropdownToggle = document.getElementById('dropdown-toggle');

    // Menangani navigasi ke halaman signup
    if (goToSignup) {
        goToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginPage.style.display = 'none';
            signupPage.style.display = 'block';
        });
    }

    // Menangani navigasi ke halaman login
    if (goToLogin) {
        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupPage.style.display = 'none';
            loginPage.style.display = 'block';
        });
    }

    // Signup form handler
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

            if (!email || !password || password !== confirmPassword) {
                alert("Please check the form fields.");
                return;
            }

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            alert("Signup successful!");
            window.location.href = 'login.html';
        });
    }

    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                alert("Login successful!");
                window.location.href = 'index.html';
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    // Update navigation bar after login/signup
    const updateNavigation = () => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            signupNav.style.display = 'none';
            profileNav.style.display = 'block';
            userProfileName.textContent = `Welcome, ${storedEmail}`;
        } else {
            signupNav.style.display = 'block';
            profileNav.style.display = 'none';
        }
    };
    updateNavigation();

    // Handle modal display for profile
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        profileModal.style.display = 'block'; // Show the modal
    });

    // Close the modal when clicking the close button
    closeModalButton.addEventListener('click', function() {
        profileModal.style.display = 'none'; // Hide the modal
    });

    // Close the modal if clicked outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none'; // Hide the modal
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
        window.location.href = 'login.html';
    });
});




//Testimonial
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsData = [
        {
            text: " ",
            name: " ",
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
                <alt src="" alt="${testimonial.name}">
                <h4>${testimonial.name}</h4>
            </div>
        `;
        return div;
    };

    // Fungsi untuk memuat testimonial ke dalam carousel
    const loadTestimonials = () => {
        carousel.innerHTML = '';
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

        const name = document.getElementById('names').value.trim();
        // const category = document.getElementById('category').value.trim();
        const message = document.getElementById('messages').value.trim();

        if (!name || !message) {
            alert('All fields are required!');
            return;
        }

        const newTestimonial = {
            text: message,
            name: name,
         // Default image jika tidak ada upload
        };

        testimonialsData.push(newTestimonial); // Tambahkan testimonial ke data
        loadTestimonials(); // Refresh carousel
        testimonialForm.reset(); // Reset form
        alert('Thank you for your testimonial!');
    });
});
