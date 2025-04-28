import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"


function HeaderDisplay() {

    const imageData = [
        "https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/53874/pexels-photo-53874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1503009/pexels-photo-1503009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]

    return (
        <>
            <Carousel className={"my-10 mx-auto w-[93vw] overflow-x-clip sm:overflow-visible"}>
                <CarouselContent>
                    {imageData.map((image, index) => (
                        <CarouselItem key={index}>
                            <img src={image} loading={"lazy"} alt={`Image ${index + 1}`}
                                 className="w-full object-cover h-[60vh] rounded-3xl"/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

        </>
    );
}

export default HeaderDisplay;