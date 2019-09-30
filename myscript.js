/*document.addEventListener('DOMContentLoaded', event=>{
    let button = document.getElementById('connect')
    
    button.addEventListener('click', async() => {
        let device
        const VENDOR_ID = 0x0BC2

        try{
            device = await navigator.usb.requestDevice({
                filters:[{
                    vendorID: VENDOR_ID
                }]
            })
            console.log('open')
            await device.open()
            console.log('opened:', device)
        }
        catch(error){
            console.log(error)
        }
        await device.close()
    })
})*/
var device;

navigator.usb.requestDevice({ filters: [{ vendorId: 0x0bc2 }] })
.then(selectedDevice => {
   device = selectedDevice;
   return device.open(); // Begin a session.
 })
.then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
.then(() => device.claimInterface(2)) // Request exclusive control over interface #2.
.then(() => device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x22,
    value: 0x01,
    index: 0x02})) // Ready to receive data
.then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
.then(result => {
  let decoder = new TextDecoder();
  console.log('Received: ' + decoder.decode(result.data));
})
.catch(error => { console.log(error); });
