export default function BtnLoginGoogle({ mensaje }) {
    return (
        <button
            className="bg-purple-400 hover:bg-purple-500 p-2 rounded max-w-[300px] text-white font-bold mt-4 flex items-center justify-center"
            style={{ minWidth: 0, width: "100%", position: "relative" }}
            onClick={() => alert('Continuar con Google')}
        >
            <div className="flex items-center justify-center w-full relative">
                <img src="../../../google_logo.png" alt="Google Logo" className="max-w-[20px] mr-2 absolute left-0" />
                <span className="w-full text-center">{mensaje}</span>
            </div>
        </button>
    );
}
