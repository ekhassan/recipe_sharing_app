/* eslint-disable react/prop-types */
import { useRef } from "react"
import { Button, Popover, Badge, Tooltip } from "flowbite-react"
import { QrCode, Zap, ImageDown } from "lucide-react"
import * as htmlToImage from "html-to-image"
import QRCode from 'react-qr-code'
import { toast } from "react-hot-toast"
import parse from 'html-react-parser'
import { HiCheck, HiClock, HiCalendar } from "react-icons/hi";


import { timeAgo, formatDate, formatTime } from "../utils/util"

const RecipeDetail = ({ img, name, tags, notes, details, ingredients, directions, under30min, createdAt, updatedAt, user }) => {

    const qrCodeRef = useRef();


    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            htmlToImage.toPng(qrCodeRef.current)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = `QRCode_${user?.username}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    toast.success('QR Code downloaded successfully!');
                })
                .catch((error) => {
                    console.error('Error downloading QR Code:', error);
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
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-medium mb-3">{name}</h1>
                        {under30min ?
                            <Badge size="sm" className="rounded-3xl bg-[#ec4700]/20 text-gray-900 text-base">Under 30 Minutes Recipe</Badge> : ""}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tags && tags.map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-slate-400/30 text-xs rounded-full font-medium">{tag}</span>
                        ))}
                    </div>
                    <div className="bg-orange-500 w-full h-[26.75rem] my-5 rounded-3xl overflow-hidden">
                        <img src={img ? img : "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48-300x300.jpg"} alt={name} className="w-full h-full object-cover" />
                    </div>

                    <div className="my-3 flex gap-4">
                        <Tooltip content="Creation Date">
                            <Badge size="sm" icon={HiCalendar} className="rounded-3xl bg-[#ec4700]/20 text-gray-900 " >{formatDate(createdAt)}</Badge>
                        </Tooltip>
                        <Tooltip content="Created At">
                            <Badge size="sm" icon={HiClock} className="rounded-3xl bg-[#ec4700]/20 text-gray-900 " >{formatTime(createdAt)}</Badge>
                        </Tooltip>
                        <Tooltip content="Updated At">
                            <Badge size="sm" icon={HiCheck} className="rounded-3xl bg-[#ec4700]/20 text-gray-900" >{timeAgo(updatedAt)}</Badge>
                        </Tooltip>
                    </div>

                    {/* Profile section */}
                    <div className="flex items-center justify-between my-5">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full overflow-hidden">
                                <img src={user?.displayPicture} alt={name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-lg font-medium">{user?.username}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Popover aria-labelledby="default-popover"
                                className="bg-[#fdfaf5] border rounded-3xl shadow-2xl"
                                content={
                                    <div className="p-3 bg-[#fdfaf5] rounded-3xl" >
                                        <QRCode className="p-1" value={`https://freshlyy.vercel.app/u/${user?.username}`} size={128} bgColor="#fdfaf5" fgColor="#ec4700" ref={qrCodeRef} />
                                        <p className="mt-2 text-wrap text-xs font-semibold text-center">Scan to view profile.</p>
                                        <Button onClick={downloadQRCode} className="flex items-center justify-center bg-[#ec4700] hover:bg-[#ec4700] text-white text-base font-medium focus:ring-0 rounded-full h-10 w-10 absolute right-0" color="bg-[#ec4700]"><ImageDown size={20} /></Button>
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
                            {notes ? parse(notes) : "No notes available."}
                        </div>

                        <h3 className="text-3xl font-medium mt-10">Details</h3>
                        <div className="text-lg detail my-4">
                            {details ? parse(details) : "No details available."}
                        </div>

                        <h3 className="text-3xl font-medium mt-10">Ingredients</h3>
                        <div className="text-lg detail my-4">
                            {ingredients ? parse(ingredients) : "No ingredients available."}
                        </div>

                        <h3 className="text-3xl font-medium mt-10">Directions</h3>
                        <div className="text-lg detail my-4">
                            {directions ? parse(directions) : "No directions available."}
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default RecipeDetail