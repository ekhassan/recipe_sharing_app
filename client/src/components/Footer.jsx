import logoWhite from "../assets/logo-white.svg"

const Footer = () => {
    return (

        <>
            <div className="bg-[#ec4700] text-white m-2 rounded-3xl">
                <footer className="mx-5 sm:mx-32">
                    <div className="flex flex-wrap items-center justify-between py-4 gap-y-4">
                        <div className="flex items-center justify-center gap-5">
                            <img src={logoWhite}
                                alt="freshly"
                            />
                            <h1 className="text-4xl">Freshly</h1>
                        </div>
                        <div className=" leading-relaxed text-center">
                            Developed by {' '}
                            <a href="https://github.com/ekhassan" className="font-bold underline hover:no-underline" title="Github Profile" target="_blank">
                                Hassan
                            </a>
                            {' '}& Designed by{' '}

                            <a href="https://www.figma.com/@karnage" className="font-bold underline hover:no-underline" title="Figma Profile" target="_blank">
                                karnage
                            </a>

                        </div>
                    </div>
                </footer >
            </div >
        </>
    )
}

// https://www.figma.com/@karnage

export default Footer