import React, { Fragment, PureComponent } from 'react'
import axios from 'axios'
import { API_URL } from '../const/defaultValues'
let _this
class Users extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            page: 0,
            search: "",
            limit: 10,
            totalPage: 0
        }

        _this = this
    }

    componentDidMount() {
        this.fatchData()
    }

    fatchData = () => {
        let { page, search, limit } = this.state
        console.log(page)
        let data = {
            page: page,
            search: search,
            limit: limit,
        }
        axios.post(API_URL + 'user/get-users', data)
            .then(function (res) {
                if (res.data.status) {
                    _this.setState({ data: res.data.data, totalPage: res.data.total })
                } else {
                    alert(res.data.message);
                }
            })
            .catch(function (error) {
                alert(error);
            });
    }

    search = (value) => {
        this.setState({ page: 0, search: value }, () => this.fatchData())
    }

    prev = () => {
        let { page } = this.state

        if (page > 0) {
            page = page - 1
            this.setState({ page }, () => this.fatchData())
        }
    }

    next = () => {
        let { page } = this.state
        page = page + 1
        this.setState({ page }, () => this.fatchData())
    }

    limit = (value) => {
        let { page, limit } = this.state
        page = 0
        limit = value
        this.setState({ page, limit }, () => this.fatchData())

    }

    render() {
        let { data, limit, page, totalPage, search } = this.state
        console.log(data)
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-right mt-3">
                                <input
                                    type="text"
                                    placeholder="search"
                                    value={search}
                                    className="form-control"
                                    onChange={(e) => this.search(e.target.value)}

                                />
                            </div>
                            <table className="table table-striped mt-3">
                                <thead>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </thead>
                                <tbody>
                                    {
                                        data.map((el, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{el.firstName}</td>
                                                    <td>{el.lastName}</td>
                                                    <td>{el.email}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="text-right">
                                <button className="btn btn-sm btn-defult mx-1 border" onClick={this.prev} disabled={page === 0 ? true : false}>Prev</button>
                                <select className="btn btn-sm btn-defult mx-1 border" onChange={(e) => this.limit(e.target.value)} value={limit}>
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                    <option>50</option>
                                </select>
                                <button className="btn btn-sm btn-defult mx-1 border" onClick={this.next} disabled={totalPage - 1 === page ? true : false}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Users