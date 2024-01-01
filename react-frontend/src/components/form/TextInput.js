const TextInput = (props) => {
    return (
        <div className="text-input">
            <label htmlFor={props.fieldName}>{props.displayName} : </label>
            <input
                type={props.type}
                className="input"
                placeholder={props.placeholder}
                name={props.fieldName}
                value={props.value}
                onChange={props.onChange}
                size={50}
            />
        </div>
    )
}

export default TextInput;
