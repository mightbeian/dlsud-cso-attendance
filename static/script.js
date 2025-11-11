// DOM Elements
const idNumberInput = document.getElementById('idNumber');
const timeInBtn = document.getElementById('timeInBtn');
const timeOutBtn = document.getElementById('timeOutBtn');
const messageArea = document.getElementById('messageArea');
const messageText = document.getElementById('messageText');

// Helper function to show messages
function showMessage(message, type = 'success') {
    messageArea.className = 'message-area ' + type;
    messageText.textContent = message;
    messageArea.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageArea.classList.add('hidden');
    }, 5000);
}

// Helper function to disable buttons temporarily
function setButtonsDisabled(disabled) {
    timeInBtn.disabled = disabled;
    timeOutBtn.disabled = disabled;
}

// Helper function to clear input
function clearInput() {
    idNumberInput.value = '';
    idNumberInput.focus();
}

// API call helper
async function apiCall(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'An error occurred');
        }
        
        return result;
    } catch (error) {
        throw error;
    }
}

// Time In handler
timeInBtn.addEventListener('click', async () => {
    const idNumber = idNumberInput.value.trim();
    
    if (!idNumber) {
        showMessage('Please enter your ID Number', 'error');
        return;
    }
    
    setButtonsDisabled(true);
    
    try {
        const result = await apiCall('/api/time-in', { id_number: idNumber });
        
        if (result.success) {
            const messageType = result.is_birthday ? 'birthday' : 'success';
            showMessage(result.message, messageType);
            clearInput();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setButtonsDisabled(false);
    }
});

// Time Out handler
timeOutBtn.addEventListener('click', async () => {
    const idNumber = idNumberInput.value.trim();
    
    if (!idNumber) {
        showMessage('Please enter your ID Number', 'error');
        return;
    }
    
    setButtonsDisabled(true);
    
    try {
        const result = await apiCall('/api/time-out', { id_number: idNumber });
        
        if (result.success) {
            showMessage(result.message, 'success');
            clearInput();
        }
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        setButtonsDisabled(false);
    }
});

// Enter key support
idNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Default to Time In when pressing Enter
        timeInBtn.click();
    }
});

// Focus input on page load
window.addEventListener('load', () => {
    idNumberInput.focus();
});