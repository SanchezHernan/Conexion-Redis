const Select = ({atr, handleChange}) => {

    const {title, episodios} = atr

    return(
        <div>
            <label>{title}</label>
            
            <select className="form-select" aria-label="Default select example" onChange={(e) => handleChange(e.target.value)}>
                {episodios.map((ep, i) => 
                    <option key={ep} value={ep}>{ep}</option>
                )}
            </select>
        </div>
    )
}

export default Select