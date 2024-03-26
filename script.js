function encryptNumber() {
    const input = document.getElementById("numberInput").value;
    const encryptedNumber = encrypt(input);
    document.getElementById("encryptedNumber").innerText = `Encrypted number: ${encryptedNumber}`;
}

function decryptNumber() {
    const encryptedInput = document.getElementById("encryptedInput").value;
    const decryptedNumber = decrypt(encryptedInput);
    document.getElementById("decryptedNumber").innerText = `Decrypted number: ${decryptedNumber}`;
}

function encrypt(number) {
    const shift = 3; // You can change the shift value for stronger or weaker encryption
    let encrypted = "";

    for (let i = 0; i < number.length; i++) {
        const charCode = number.charCodeAt(i);
        let encryptedCharCode;

        if (charCode >= 48 && charCode <= 57) { // Check if it's a digit
            encryptedCharCode = ((charCode - 48 + shift) % 10) + 48;
        } else {
            encryptedCharCode = charCode; // Leave non-digits unchanged
        }

        encrypted += String.fromCharCode(encryptedCharCode);
    }

    return encrypted;
}

function decrypt(encryptedNumber) {
    const shift = 3; // Assuming the same shift value as used for encryption
    let decrypted = "";

    for (let i = 0; i < encryptedNumber.length; i++) {
        const charCode = encryptedNumber.charCodeAt(i);
        let decryptedCharCode;

        if (charCode >= 48 && charCode <= 57) { // Check if it's a digit
            decryptedCharCode = ((charCode - 48 - shift + 10) % 10) + 48;
        } else {
            decryptedCharCode = charCode; // Leave non-digits unchanged
        }

        decrypted += String.fromCharCode(decryptedCharCode);
    }

    return decrypted;
}
