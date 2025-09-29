export default function Btn({ children, className }) {
    return (
        <button className={className}>
            {children}
        </button>
    );
}
