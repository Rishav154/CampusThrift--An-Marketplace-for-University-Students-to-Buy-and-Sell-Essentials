import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {useEffect, useRef, useState} from "react"

function HeaderDisplay() {
    const plugin = useRef(
        Autoplay({delay: 2500, stopOnInteraction: false})
    )

    const [isMobile, setIsMobile] = useState(false);

    // Update the mobile state based on screen width
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const imageData = [
        "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/53874/pexels-photo-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]

    return (
        <div className="relative w-full">
            <div className="w-full px-2 sm:px-4">
                <Carousel
                    className="my-4 sm:my-10 mx-auto w-full overflow-visible"
                    plugins={[plugin.current]}
                    opts={{
                        loop: true,
                        duration: isMobile ? 20 : 30,
                        speed: isMobile ? 40 : 60,
                        align: "center",
                    }}
                >
                    <CarouselContent className="-ml-2 sm:-ml-4">
                        {imageData.map((image, index) => (
                            <CarouselItem key={index} className="pl-2 sm:pl-4 md:pl-4">
                                <div className="relative h-full w-full">
                                    <img
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        className="w-full object-cover h-[30vh] sm:h-[40vh] md:h-[40vh] lg:h-[45vh] rounded-xl sm:rounded-3xl shadow-md transition-all duration-700"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl sm:rounded-3xl"></div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"/>
                    <CarouselNext className="hidden sm:flex h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"/>
                </Carousel>
            </div>

        </div>
    )
}

export default HeaderDisplay