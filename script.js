// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle the navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const errorMessages = [];

    if (name.trim() === "") {
        errorMessages.push("Name is required.");
    }
    if (email.trim() === "") {
        errorMessages.push("Email is required.");
    } else if (!validateEmail(email)) {
        errorMessages.push("Invalid email format.");
    }
    if (phone.trim() === "") {
        errorMessages.push("Phone is required.");
    } else if (!validatePhone(phone)) {
        errorMessages.push("Invalid phone format. Use 123-456-7890.");
    }
    if (message.trim() === "") {
        errorMessages.push("Message is required.");
    }

    const errorMessagesDiv = document.getElementById('errorMessages');
    errorMessagesDiv.innerHTML = "";
    if (errorMessages.length > 0) {
        errorMessages.forEach(msg => {
            const p = document.createElement('p');
            p.textContent = msg;
            errorMessagesDiv.appendChild(p);
        });
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return re.test(String(phone));
}

const firebaseConfig = {
    apiKey: "AIzaSyDSvcd2kQsOuyjd5zU4q6AYvTFJrZfMK8I",
    authDomain: "portfolio-8c6a2.firebaseapp.com",
    databaseURL: "https://portfolio-8c6a2-default-rtdb.firebaseio.com",
    projectId: "portfolio-8c6a2",
    storageBucket: "portfolio-8c6a2.appspot.com",
    messagingSenderId: "888373683576",
    appId: "1:888373683576:web:8e6095d36bca59e80c148d",
    measurementId: "G-F0E86J5RMH"
  };
  firebase.initializeApp(firebaseConfig);

  //reference
  var contactDB = firebase.database().ref('contact')

document.getElementById('contactForm').addEventListener('submit', submitForm)

function submitForm(e){
    e.preventDefault();
    var name = getElementByVal('name');
    var emailid = getElementByVal('email');
    var mobile = getElementByVal('phone');
    var msgcontent = getElementByVal('message')

    saveMessages(name,emailid,mobile,msgcontent);

    document.querySelector(".alert").style.display = 'block';

    setTimeout(() =>{
        document.querySelector(".alert").style.display = 'none';
    },3000);

    document.getElementById("contactForm").reset();
}

const saveMessages = (name,emailid,mobile,msgcontent) =>{
    var newContactForm = contactDB.push();

    newContactForm.set({
        name: name,
        emailid: emailid,
        mobile: mobile,
        msgcontent: msgcontent,
    });
};

const getElementByVal = (id) => {
    return document.getElementById(id).value;
}
