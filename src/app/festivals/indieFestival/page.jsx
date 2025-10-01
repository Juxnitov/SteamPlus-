import Btn from "@/components/festivals/Btn";
import Img from "../../../components/ui/img";

export default function Home() {
return (
    <div className="bg-yellow-300 min-h-screen flex flex-col items-center justify-center p-4">
                <Img
                    className={"max-w-full h-auto"}
                    src={"../../../indieFestivalBanner.png"}
                    alt={"Banner Indie Festival"}
                />
                <div className="mt-6 w-full max-w-4xl bg-yellow-100 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-center mt-6">
                                <div 
                                className="
                                flex space-x-4
                                border-2 
                                rounded 
                                pt-4 
                                pb-4
                                px-8
                                border-yellow-800
                                bg-yellow-200
                                text-yellow-800
                                font-bold
                                text-lg
                                shadow-lg
                                "
                                >   
                                <Btn 
                                        className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} 
                                        mensaje={"Populares"}
                                />
                                <Btn 
                                        className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} 
                                        mensaje={"Ultimos lanzamientos"}
                                />
                                <Btn 
                                        className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} 
                                        mensaje={"Coming soon"}
                                        />
                                </div>
                        </div>
                        <div className="
                                grid grid-cols-3
                                gap-4
                                mt-6
                                border-2 
                                rounded 
                                pt-4 
                                pb-4
                                px-8
                                border-yellow-800
                                bg-yellow-200
                                text-yellow-800
                                font-bold
                                text-lg
                                shadow-lg
                                "
                                >
                                
                        </div>
                </div>
            </div>
);
}
