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
                            <Btn className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} />
                            <Btn className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} />
                            <Btn className={"hover:underline hover:bg-yellow-300 transition-colors duration-300"} />
                    </div>
            </div>
    </div>
);
}
