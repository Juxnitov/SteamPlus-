export default function Btn({ mensaje, className }) {
    return (
        <button className={className}>
            {mensaje}
        </button>
    );
}
