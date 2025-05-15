import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {useRef} from "react"

function HeaderDisplay() {
    const plugin = useRef(
        Autoplay({delay: 2500, stopOnInteraction: false})
    )

    const imageData = [
        "https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/12575883/pexels-photo-12575883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/53874/pexels-photo-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]

    return (
        <Carousel
            className="my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible"
            plugins={[plugin.current]}
            opts={{
                loop: true,
                duration: 30,
                speed: 60,
            }}
        >
            <CarouselContent>
                {imageData.map((image, index) => (
                    <CarouselItem key={index}>
                        <img
                            src={image}
                            loading="lazy"
                            alt={`Image ${index + 1}`}
                            className="w-full object-cover h-[60vh] rounded-3xl transition-all duration-700"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    )
}

export default HeaderDisplay