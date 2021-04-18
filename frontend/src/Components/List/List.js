const List = ({title, chList}) => {

    return(
        <div>
            <h2>{title}</h2>
            {chList &&
                <ul className='list-group'>
                    {chList.map((character, i) => 
                        <li className='list-group-item' key={i}>{character}</li>
                    )}
                </ul>
            }
        </div>
    )
}

export default List