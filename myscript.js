document.addEventListener('DOMContentLoaded', event=>{
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
})