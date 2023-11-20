import __dirname from "../utils.js";

const options = {
    definition : {
        openapi : "3.0.1",
        info : {
            title: "ECOMMERCE",
            description : "Ecommerce API",
        }
    },
    apis : [`${__dirname}/docs/*.yaml`]
}

export default options