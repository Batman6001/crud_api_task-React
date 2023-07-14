import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from "axios";

const Application = () => {
    const [list, setList] = useState([])
    const [showNo, setShowNo] = useState({ first: 0, last: 5 })
    const { first, last } = showNo
    const [id, setId] = useState(null)
    const [editId, setEditId] = useState()
    // const [eidtName, setEditName] = useState();
    const [user, setUser] = useState({ id: '', name: '', url: '' })
    const { name } = user

    // Get Api
    let url = 'http://localhost:5000/user'
    const GetData = () => {
        try {
            axios.get(url).then((resp) => {
                if (resp.status == 200) {
                    setList(resp.data)
                }
            });
        } catch (error) {
        }
    }
    useEffect(() => {
        GetData()
    }, [])

    // Pagination (first 0-----Last 5)
    const handlePagination = (typ) => {
        if (typ == 0) {
            setShowNo({ first: first - 5, last: last - 5 })
        } else {
            setShowNo({ first: first + 5, last: last + 5 })
        }
    }

    // Delete Items
    const handle_delete = (id) => {
        setId(id)
    }
    const deleteDone = () => {
        axios.delete(`http://localhost:5000/user/${id}`).then((res) => {
            // console.log(res)
            if (res.status == 200) {
                document.getElementById('delete-id').click()
                GetData()
            }
        }).catch()
    }

    // Edit Items
    const inputField = (e) => {
        setUser({ ...user, name: e.target.value })
    }
    const editNameValue = async (nameId) => {
        try {
            await axios.get(`${url}/${nameId}`).then((resp) => {
                setUser(resp.data)
            });
        } catch (error) {
        }
        setEditId(nameId)
        console.log(editId)
    }
    console.log(user)
    const postEditData = async () => {
        try {
            await axios.put(`${url}/${editId}`, user)
            GetData()
            document.getElementById('editModel').click()
        } catch (error) {
        }
    }

    return (
        <div>
            <Nav list={list} setList={setList} GetData={GetData} setShowNo={setShowNo} />

            {/* Delete modal  */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <p>Are you sure you want to delete? </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='delete-id' data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteDone}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit modal */}
            <div className="modal fade" id="editmd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='editModel' aria-label="Close"></button>
                        </div>
                        <div className='modal-body'>
                            <div className='row'>
                                <div className="input-group col-md-12 mb-3">

                                    <input value={name} onChange={(e) => inputField(e)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" id='delete-id' data-bs-dismiss="modal">Close</button>
                            <button onClick={postEditData} type="button" className="btn btn-primary" >Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.slice(first, last).map((val, ind) => {
                            return (
                                <tr key={ind} id={ind}>
                                    <th scope="row">{val.id}</th>
                                    <td><img src={val.url} alt='none' /></td>
                                    <td>{val.name}</td>
                                    <td><button onClick={() => editNameValue(val.id)} type="button" data-bs-toggle="modal" data-bs-target="#editmd" data-bs-whatever="@mdo" className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg></button></td>
                                    <td><button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => { handle_delete(val.id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>

                                    </button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className='nextPrev'>
                <button className='btn btn-danger' disabled={first <= 0} onClick={() => handlePagination(0)}>&#8249;</button>
                <button className='btn btn-danger ms-5' disabled={list.length <= last} onClick={() => handlePagination(1)}>&#8250;</button>
            </div>
        </div>
    )
}

export default Application
