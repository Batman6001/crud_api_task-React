import React, { useState } from 'react'

const Nav = ({ setList, list, GetData, setShowNo }) => {
    const [searchInput, setSearchInput] = useState("")

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
        console.log(e.target.value)
        if (e.key === "Enter") {
            let s = list.filter((val) => {
                if (val.name.toUpperCase() == (e.target.value).toUpperCase()) {
                    return val
                }
            })
            setList(s)
            setShowNo({ first: 0, last: 5 })
        }
        if (e.target.value.length <= 1) {
            GetData()
        }
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-info">
                <div className="container-fluid">
                    <a className="navbar-brand">SoftMind</a>
                    <div className="d-flex">
                        <input className="form-control me-2" onKeyUp={handleChangeSearchInput} id='search' placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
