function encryptInput() {
    const input = document.getElementById("Input").value;
    const encryptedInput = encrypt(input);
    document.getElementById("encryptedInput").innerText = encryptedInput;
    if(input === '') {
        document.getElementById('error_encrypt').textContent = "يجب عليك كتابة شيء ما أولا";
        document.getElementById('error_encrypt').style.color = "red";
        console.log("input is empty");
    }else{
        document.getElementById('error_encrypt').textContent = "";
        document.getElementById("encrypt_result").style.display = 'block';
    }
}

const shift = 5;
const key = "MYSECRETKEY"; // A key for Vigenère cipher

// Function to apply Vigenère cipher
function vigenereCipher(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        // Encrypt alphabetic characters
        if (charCode >= 65 && charCode <= 90) { // Uppercase A-Z
            result += String.fromCharCode(((charCode - 65 + (keyCharCode % 26)) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) { // Lowercase a-z
            result += String.fromCharCode(((charCode - 97 + (keyCharCode % 26)) % 26) + 97);
        } else {
            result += text[i]; // Non-alphabetic characters remain unchanged
        }
    }
    return result;
}

// Function to reverse the text
function reverseText(text) {
    return text.split('').reverse().join('');
}

// Final encryption function combining multiple steps
function encrypt(number) {
    // Initial shift cipher
    let encrypted = "";
    for (let i = 0; i < number.length; i++) {
        const charCode = number.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            const shiftedCharCode = ((charCode - 48 + shift) % 10) + 48;
            encrypted += String.fromCharCode(shiftedCharCode);
        } else {
            encrypted += number[i];
        }
    }

    // Apply Vigenère cipher
    encrypted = vigenereCipher(encrypted, key);

    // Reverse the text
    encrypted = reverseText(encrypted);

    return encrypted;
}

// ------------------------------------------------------------------------------

function decryptInput() {
    const input = document.getElementById("Input_2").value;
    const encryptedInput = decrypt(input);
    document.getElementById("decryptedInput").innerText = encryptedInput;
    if(input === '') {
        document.getElementById('error_decrypt').textContent = "يجب عليك كتابة شيء ما أولا";
        document.getElementById('error_decrypt').style.color = "red";
        console.log("input is empty");
    }else{
        document.getElementById('error_decrypt').textContent = "";
        document.getElementById("decrypt_result").style.display = 'block';
    }
}

// Function to reverse the Vigenère cipher
function reverseVigenereCipher(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % key.length);
        // Decrypt alphabetic characters
        if (charCode >= 65 && charCode <= 90) { // Uppercase A-Z
            result += String.fromCharCode(((charCode - 65 - (keyCharCode % 26) + 26) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) { // Lowercase a-z
            result += String.fromCharCode(((charCode - 97 - (keyCharCode % 26) + 26) % 26) + 97);
        } else {
            result += text[i]; // Non-alphabetic characters remain unchanged
        }
    }
    return result;
}

// Final decryption function combining multiple steps
function decrypt(encryptedNumber) {
    // Reverse the text
    let decrypted = reverseText(encryptedNumber);

    // Reverse the Vigenère cipher
    decrypted = reverseVigenereCipher(decrypted, key);

    // Initial shift cipher (reverse the shift)
    let originalNumber = "";
    for (let i = 0; i < decrypted.length; i++) {
        const charCode = decrypted.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            const originalCharCode = ((charCode - 48 - shift + 10) % 10) + 48;
            originalNumber += String.fromCharCode(originalCharCode);
        } else {
            originalNumber += decrypted[i];
        }
    }

    return originalNumber;
}