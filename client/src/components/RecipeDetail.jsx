import { useRef } from "react"
import { Button, Popover } from "flowbite-react"
import { QrCode, Zap, ImageDown } from "lucide-react"
import * as htmlToImage from "html-to-image"
import QRCode from 'react-qr-code'
import { toast } from "react-hot-toast"



// eslint-disable-next-line react/prop-types
const RecipeDetail = ({ img, name, tags, user }) => {

    const qrCodeRef = useRef();

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            htmlToImage.toPng(qrCodeRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `test_QRCode.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success('QR Code downloaded successfully!');
                })
                .catch((error) => {
                    console.error('Error downloading QR Code:', error);
                    // Show error toast
                    toast.error('Failed to download QR Code.');
                });
        } else {
            toast.error('QR Code is not available for download.');
        }
    };

    return (
        <>
            <div>
                <div className="py-10">
                    <h1 className="text-4xl font-medium mb-3">{name}</h1>
                    <div className="flex gap-1 mt-3">
                        {/* eslint-disable-next-line react/prop-types */}
                        {tags && tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-slate-400/30 text-xs rounded-full font-medium">{tag}</span>
                        ))}
                    </div>
                    <div className="bg-orange-500 w-full h-[26.75rem] my-5 rounded-3xl overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Profile section */}
                    <div className="flex items-center justify-between my-5">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img src={img} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-lg font-medium">Claire </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Popover aria-labelledby="default-popover"
                                className="bg-[#fdfaf5] border rounded-3xl shadow-2xl"
                                content={
                                    <div className="p-3 bg-[#fdfaf5] rounded-3xl" >
                                        <QRCode className="p-1" value={"http://192.168.10.4:5173/detail/123"} size={128} bgColor="#fdfaf5" fgColor="#ec4700" ref={qrCodeRef} />
                                        <p className="mt-2 text-wrap text-xs font-semibold text-center">Scan to view profile.</p>
                                        <Button onClick={downloadQRCode} className="flex items-center justify-center bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 rounded-full h-10 w-10 absolute right-0" color="bg-[#ec4700]"><ImageDown /></Button>
                                    </div>
                                } >
                                <Button className="flex items-center justify-center bg-[#1F1D1B] hover:bg-[#1F1D1B] text-white text-base font-medium focus:ring-0 rounded-full h-10 w-10" color="bg-[#1F1D1B]">
                                    <QrCode size={24} />

                                </Button>
                            </Popover>
                            <Button className="flex items-center justify-center bg-[#1F1D1B] hover:bg-[#1F1D1B] text-white text-base font-medium focus:ring-0 rounded-full h-10 w-10" color="bg-[#1F1D1B]">
                                <Zap size={24} />
                            </Button>
                            <Button className="flex items-center justify-center bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0" color="bg-[#ec4700]" pill>Follow</Button>
                        </div>
                    </div>

                    {/* Detail section */}

                    <div >

                        <h3 className="text-3xl font-medium mt-10">Chef&apos;s Notes</h3>
                        <div className="text-lg detail my-4">
                            This is my personal favorite dish and version. Definitely recommend experimenting Add lomboks for spice or green tea for additional flavor
                        </div>

                        <h3 className="text-3xl font-medium mt-10">Details</h3>
                        <div className="text-lg detail my-4">

                        </div>

                        <h3 className="text-3xl font-medium mt-10">Ingredients</h3>
                        <div className="text-lg detail my-4">

                        </div>

                        <h3 className="text-3xl font-medium mt-10">Directions</h3>
                        <div className="text-lg detail my-4">

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default RecipeDetail