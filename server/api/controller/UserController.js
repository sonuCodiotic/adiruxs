const User = require('../model/User')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");




exports.add_user = (req, res) => {
    let { firstname, lastname, password, email } = req.body;
    if (firstname == '' || lastname == '' || password == '' || email == '') {
        return res.status(200).send({
            status: false,
            message: "all fields are required"
        });
    }

    User.find({ email: email })
        .exec()
        .then(result => {
            if (result.length) {
                return res.status(200).send({
                    message: "Email Already Exists",
                    status: false,
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(200).send({
                            message: 'Password is required',
                            status: false
                        })
                    } else {
                        password = hash
                        const user = new User({
                            firstName: firstname,
                            lastName: lastname,
                            password: password,
                            email: email,
                        })

                        user
                            .save()
                            .then((result) => {
                                const token = jwt.sign(
                                    {
                                        email: result.email,
                                        Id: result._id,
                                    },
                                    process.env.TOKEN,
                                    {
                                        expiresIn: "15 days",
                                    }
                                );

                                return res.status(200).send({
                                    status: true,
                                    data: { '_token': token },
                                    message: "User registration successfully."
                                });
                            })
                            .catch((err) => {
                                return res.status(500).send({
                                    status: false,
                                    message: err
                                });
                            })
                    }
                });

            }
        })
        .catch(err => {
            return res.status(500).send({
                status: false,
                message: err
            });
        })


}


exports.login = async (req, res) => {
    let { password, email } = req.body;
    if (password == '' || email == '') {
        return res.status(200).send({
            status: false,
            message: "all fields are required"
        });
    }

    User.find({ email: email })
        .exec()
        .then((user) => {
            if (user.length) {
                bcrypt.compare(password, user[0].password, function (err, result) {
                    if (result === undefined || !result) {
                        return res.status(200).send({
                            message: "Wrong Password",
                            status: false,
                        });
                    } else {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                Id: user[0]._id,
                            },
                            process.env.TOKEN,
                            {
                                expiresIn: "15 days",
                            }
                        );

                        return res.status(200).send({
                            status: true,
                            data: { '_token': token },
                            message: "User logged successfully."
                        });
                    }
                })

            } else {
                return res.status(200).send({
                    status: false,
                    message: "User not exists successfully."
                });
            }

        })
        .catch((err) => {
            return res.status(500).send({
                status: false,
                message: err
            });
        })

}


exports.get_all_user = async (req, res) => {
    let { limit, search, page } = req.body;
    if (!limit) {
        limit = 10
    }

    let query = "";
    let i = 0;
    let params = ['email', "firstName", "lastName"]

    //search query start
    query += `{"$and" : [
        { "$or":[`;
    for (key in params) {
        query += `{"${params[key]}":{ "$regex":".*${search}.*" ,"$options" :"i"} }`;
        if (i < Object.keys(params).length - 1) {
            query += `,`;
        }
        i++;
    }

    query += `]}]}`;
    //search query end

    //count query start with filter condition
    let countQuery = query;
    var countQueryObj = JSON.parse(countQuery);
    let totalData = await User.find(countQueryObj).countDocuments();
    let totalpages = Math.ceil(totalData / (limit === "" ? totalData : limit));


    let offset = page * limit

    query = `{"$match":${query} }`;
    if (offset > -1 || offset === 0) {
        query += `,{ "$skip": ${offset} }`;
    }

    if (limit !== "" && limit > 0) {
        query += `,{ "$limit": ${limit} }`;
    }

    query = `[${query}]`;
    //console.log(query)

    var queryObj = JSON.parse(query);

    User.aggregate(queryObj)
        .exec()
        .then((result) => {
            return res.status(200).send({
                status: true,
                data: result,
                total: totalpages,
                count: totalData,
            });
        })
        .catch((err) => {
            return res.status(500).send({
                status: false,
                message: err
            });
        })

}




