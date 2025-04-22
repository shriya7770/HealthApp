let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const startButton = document.getElementById('startBtn');
const barcodeResult = document.getElementById('barcodeResult');

// Get available cameras and start the scanner
async function startScanner() {
    try {
        // First check if we have camera permissions
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (!videoDevices || videoDevices.length === 0) {
            throw new Error('No camera devices found');
        }

        // Prefer the back camera on mobile devices
        selectedDeviceId = videoDevices.find(device => device.label.toLowerCase().includes('back'))?.deviceId 
            || videoDevices[0].deviceId;

        // Start decoding from the selected camera
        codeReader.decodeFromVideoDevice(selectedDeviceId, videoElement, (result, err) => {
            if (result) {
                // Play a success sound
                const audio = new Audio('data:audio/wav;base64,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');
                audio.play();
                
                // Update the result display
                barcodeResult.textContent = result.text;
                
                // Briefly highlight the result
                barcodeResult.style.backgroundColor = '#90EE90';
                setTimeout(() => {
                    barcodeResult.style.backgroundColor = 'transparent';
                }, 500);
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err);
                barcodeResult.textContent = 'Scanning error: ' + err.message;
            }
        });

        // Update button state
        startButton.textContent = '🛑 Stop Scanner';
        startButton.onclick = stopScanner;
    } catch (err) {
        console.error(err);
        if (err.name === 'NotAllowedError') {
            barcodeResult.textContent = 'Error: Camera access denied. Please grant camera permissions and try again.';
        } else if (err.name === 'NotFoundError') {
            barcodeResult.textContent = 'Error: No camera found on your device.';
        } else if (err.name === 'NotReadableError') {
            barcodeResult.textContent = 'Error: Camera is already in use by another application.';
        } else {
            barcodeResult.textContent = 'Error accessing camera: ' + err.message;
        }
    }
}

// Stop the scanner
function stopScanner() {
    codeReader.reset();
    startButton.textContent = '📷 Start Scanner';
    startButton.onclick = startScanner;
}

// Initial button setup
startButton.onclick = startScanner;