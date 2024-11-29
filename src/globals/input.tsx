
export function Input({ label, type, placeholder, value, onChange, ...rest }) {
    return (
        <div>
            <label>{label}</label>
            <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}