let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
const videoElement = document.getElementById('video');
const startButton = document.getElementById('startBtn');
const barcodeResult = document.getElementById('barcodeResult');

// Configure hints for better barcode detection
const hints = new Map();
hints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
    ZXing.BarcodeFormat.EAN_13,
    ZXing.BarcodeFormat.EAN_8,
    ZXing.BarcodeFormat.UPC_A,
    ZXing.BarcodeFormat.UPC_E,
    ZXing.BarcodeFormat.CODE_128
]);
hints.set(ZXing.DecodeHintType.TRY_HARDER, true);
codeReader.hints = hints;

startButton.addEventListener('click', async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        if (videoDevices.length === 0) {
            throw new Error('No camera found');
        }

        // Use the first camera by default
        selectedDeviceId = videoDevices[0].deviceId;
        
        if (startButton.textContent === '📷 Start Scanner') {
            startButton.textContent = '⏹️ Stop Scanner';
            
            // Start scanning with improved settings
            try {
                const constraints = {
                    video: {
                        deviceId: selectedDeviceId,
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        focusMode: 'continuous'
                    }
                };

                const stream = await codeReader.decodeFromVideoDevice(
                    selectedDeviceId, 
                    'video',
                    (result, err) => {
                        if (result) {
                            // Successfully read barcode
                            const barcodeText = result.text;
                            barcodeResult.textContent = barcodeText;
                            
                            // Optional: Play a success sound
                            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRA0PVqzn77BdGAg+ltryxnMpBSl+zPLaizsIGGS57OihUBELTKXh8bllHgU2jdXzzn0vBSF1xe/glEILElyx6OyrWBUIQ5zd8sFuJAUuhM/z1YU2Bhxqvu7mnEYODlOq5O+zYBoGPJPY88p2KwUme8rx3I4+CRZiturqpVITC0mi4PK8aB8GM4nU8tGAMQYfcsLu45ZFDBFYr+ftrVoXCECY3PLEcSYELIHO8diJOQgZaLvt559NEAxPqOPwtmMcBjiP1/PMeS0GI3fH8N2RQAoUXrTp66hVFApGnt/yvmwhBTCG0fPTgjQGHW/A7eSaRQ0PVqzl77BeGQc9ltvyxnUoBSh+zPDaizsIGGS56+mjTxELTKXh8bllHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJve8sFuJAUug8/y1oU2Bhxqvu3mnUYODlOq5O+zYRsGPJLZ88p3KgUme8rx3I4+CRVht+rqpVMSC0mh4fK8aiAFM4nU8tGAMQYfccPu45ZFDBFYr+ftrVwWCECY3PLEcSYGK4DN8tiIOQgZZ7zs56BODwxPp+PxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG/A7eSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJzd8sFuJAUug8/y1oU2Bhxqvu3mnUYODlOq5O+zYRsGPJPY88p3KgUmfMrx3I4+CRVht+rqpVMSC0mh4fK8aiAFM4nU8tGAMQYfccLu45ZGCxFYr+ftrVwWCECZ3PLEcSYGK4DN8tiIOQgZZ7vs56BODwxPp+PxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG/A7eSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJzd8sFuJAUug8/y1oU2Bhxqvu3mnUYODlOq5O+zYRsGPJPY88p3KgUmfMrx3I4+CRVht+rqpVMSC0mh4fK8aiAFM4nU8tGAMQYfccLu45ZGCxFYr+ftrVwWCECZ3PLEcSYGK4DN8tiIOQgZZ7vs56BODwxPp+PxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG/A7eSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJzd8sFuJAUug8/y1oU2Bhxqvu3mnUYODlOq5O+zYRsGPJPY88p3KgUmfMrx3I4+CRVht+rqpVMSC0mh4fK8aiAFM4nU8tGAMQYfccLu45ZGCxFYr+ftrVwWCECZ3PLEcSYGK4DN8tiIOQgZZ7vs56BODwxPp+PxtmQcBjiP1/PMeywGI3fH8N+RQAoUXrTp66hWEwlGnt/yv2wiBDCG0fPTgzQHHG/A7eSaSw0PVqzl77BeGQc9ltrzxnUoBSh9y/HajDsIF2W56+mjUREKTKPi8blnHgU1jdT0z3wvBSJ0xe/glEILElyx6OyrWRUIRJzd8sFuJAU=');
                            audio.play();
                            
                            // Stop scanning after successful read
                            codeReader.reset();
                            startButton.textContent = '📷 Start Scanner';
                        }
                        if (err && !(err instanceof ZXing.NotFoundException)) {
                            console.error(err);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
                barcodeResult.textContent = 'Error: ' + err.message;
            }
        } else {
            startButton.textContent = '📷 Start Scanner';
            codeReader.reset();
            barcodeResult.textContent = '--';
        }
    } catch (err) {
        console.error(err);
        barcodeResult.textContent = 'Error: ' + err.message;
    }
});

// Clean up when page is closed
window.addEventListener('beforeunload', () => {
    codeReader.reset();
});